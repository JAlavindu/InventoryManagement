package com.lavindu.inventory.demo.config;

import com.lavindu.inventory.demo.service.CustomUserDetailsService;
import com.lavindu.inventory.demo.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    @Autowired
//    JwtService jwtService;
//    @Autowired
//    ApplicationContext applicationContext;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        String token = null;
//        String userName = null;
//
//        if(authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);
//            userName = jwtService.extractUserName(token);
//        }
//
//        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = applicationContext.getBean(CustomUserDetailsService.class).loadUserByUsername(userName);
//
//            if(jwtService.validateToken(token, userDetails)){
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//SecurityContextHolder.getContext().setAuthentication(authToken);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired private JwtService jwtService;
    @Autowired private ApplicationContext applicationContext;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        String token = null;
        // 1) check cookie
        if (request.getCookies() != null) {
            Optional<Cookie> cookie = java.util.Arrays.stream(request.getCookies())
                    .filter(c -> "jwt".equals(c.getName()))
                    .findFirst();
            if (cookie.isPresent()) token = cookie.get().getValue();
        }
        // 2) fallback to Authorization header
        if (token == null) {
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer ")) token = header.substring(7);
        }

        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                String username = jwtService.extractUsername(token);
                CustomUserDetailsService uds = applicationContext.getBean(CustomUserDetailsService.class);
                UserDetails userDetails = uds.loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception ex) {
                // invalid token — just skip authentication
            }
        }

        filterChain.doFilter(request, response);
    }
}
