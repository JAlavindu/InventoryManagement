package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.model.UserPrincipal;
import com.lavindu.inventory.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepo userRepo;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepo.findByUsername(username);
//
//        if(user == null) {
//            System.out.println("User not found: " + username);
//            throw new UsernameNotFoundException("User not found: " + username);
//        }
//
//        return new UserPrincipal(user);
//    }
//}

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) { this.userRepo = userRepo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepo.findByUsername(username)
                .or(() -> userRepo.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // If password is null (OAuth-only user), pass empty password but still allow roles
        String password = u.getPassword() == null ? "" : u.getPassword();
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name()));
        return new org.springframework.security.core.userdetails.User(u.getUsername(), password, authorities);
    }
}
