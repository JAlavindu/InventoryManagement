package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User saveUser(User user) {
        if(userRepo.existsByUsername(user.getUsername()) || userRepo.existsByEmail(user.getEmail())) {
            System.out.println("User already exists: " + user.getUsername());
            throw new IllegalArgumentException("User already exists: " + user.getUsername());
        }
        userRepo.save(user);
        return user;
    }

}
