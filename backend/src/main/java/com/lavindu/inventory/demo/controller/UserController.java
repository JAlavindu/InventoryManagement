package com.lavindu.inventory.demo.controller;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.model.enums.Role;
import com.lavindu.inventory.demo.service.JwtService;
import com.lavindu.inventory.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

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


        // Force role to CUSTOMER — frontend cannot choose this
        user.setRole(Role.CUSTOMER);

        // Hash password
        user.setPassword(encoder.encode(user.getPassword()));

        user.setEmail(username); // Normalize email to lowercase
        user.setUsername(email); // Normalize username to lowercase

        // Save user
        User savedUser = userService.saveUser(user);


        // Don't send password back to client
        savedUser.setPassword(null);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // optional: username/password login that returns token in cookie
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        var opt = userService.findByUsername(user.getUsername());
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        User u = opt.get();
        if (u.getPassword() == null || !encoder.matches(user.getPassword(), u.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        String token = jwtService.generateToken(u.getUsername(), u.getRole().name());
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true).secure(false).path("/").maxAge(24*60*60).sameSite("Lax").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged in");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true).secure(false).path("/").maxAge(0).sameSite("Lax").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged out");
    }

//    // DTO for login
//    public static class LoginRequest {
//        public String username;
//        public String password;
//
//        public String getUsername() {
//            return username;
//        }
//        // getters/setters or use lombok
//    }
}
