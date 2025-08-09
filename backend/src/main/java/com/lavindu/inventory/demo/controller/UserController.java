package com.lavindu.inventory.demo.controller;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.model.enums.Role;
import com.lavindu.inventory.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }

        // Force role to CUSTOMER — frontend cannot choose this
        user.setRole(Role.CUSTOMER);

        // Hash password
        user.setPassword(encoder.encode(user.getPassword()));

        user.setEmail(user.getEmail().toLowerCase()); // Normalize email to lowercase
        user.setUsername(user.getUsername().toLowerCase()); // Normalize username to lowercase

        // Save user
        User savedUser = userService.saveUser(user);


        // Don't send password back to client
        savedUser.setPassword(null);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
