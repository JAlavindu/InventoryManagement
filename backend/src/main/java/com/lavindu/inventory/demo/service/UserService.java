package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User saveUser(User user) {
        if(userRepo.existsByUsername(user.getUsername())) {
            System.out.println("User already exists: " + user.getUsername());
            throw new IllegalArgumentException("User already exists: " + user.getUsername());
        }
        userRepo.save(user);
        return user;
    }
}
