package com.lavindu.inventory.demo.controller;

import com.lavindu.inventory.demo.dto.MeResponse;
import com.lavindu.inventory.demo.dto.UserResponse;
import com.lavindu.inventory.demo.model.Cart;
import com.lavindu.inventory.demo.model.Customer;
import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.model.enums.Role;
import com.lavindu.inventory.demo.service.CartService;
import com.lavindu.inventory.demo.service.CustomerService;
import com.lavindu.inventory.demo.service.JwtService;
import com.lavindu.inventory.demo.service.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtService jwtService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        String username = user.getUsername().toLowerCase();
        String email = user.getEmail().toLowerCase();
        if (userService.existsByUsername(username)){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }

        if (userService.existsByEmail(email)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Password cannot be empty");
        }


        // Force role to CUSTOMER — frontend cannot choose this
        user.setRole(Role.CUSTOMER);

        // Hash password
        user.setPassword(encoder.encode(user.getPassword()));

        user.setEmail(email); // Normalize email to lowercase
        user.setUsername(username); // Normalize username to lowercase

        // Save user
        User savedUser = userService.saveUser(user);

//        // Create customer linked to this user
        Customer customer = new Customer();
        customer.setUser(savedUser);
        customer.setName(savedUser.getUsername());
        customer.setEmail(savedUser.getEmail());

        Customer savedCustomer = customerService.saveCustomer(customer);

 //Create empty cart
        Cart cart = new Cart();
        cart.setCustomer(customer);
        customer.setCart(cart);

        Cart savedCart = cartService.saveCart(cart);

        UserResponse userResponse = new UserResponse(
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", userResponse);
        response.put("customer", Map.of("name", savedCustomer.getName(), "email", savedCustomer.getEmail()));
        response.put("cart", Map.of("id", savedCart.getId()));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    // optional: username/password login that returns token in cookie
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Received login payload: " + user);
        var opt = userService.findByUsername(user.getUsername().toLowerCase());
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        User u = opt.get();
        if (u.getPassword() == null || !encoder.matches(user.getPassword(), u.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        String token = jwtService.generateToken(u.getUsername(), u.getRole().name());
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure("prod".equals(System.getenv("SPRING_PROFILES_ACTIVE")))
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logged in");
        response.put("user", Map.of("username", u.getUsername(), "role", u.getRole().name()));
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true).secure(false).path("/").maxAge(0).sameSite("Lax").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String username = jwtService.extractUsername(token);
        if (!jwtService.validateToken(token, username)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MeResponse response = new MeResponse(
                user.getUsername(),
                user.getEmail(),
                user.getCustomer() != null ? user.getCustomer().getName() : null,
                user.getRole().name()

        );

        return ResponseEntity.ok(response);
    }




}
