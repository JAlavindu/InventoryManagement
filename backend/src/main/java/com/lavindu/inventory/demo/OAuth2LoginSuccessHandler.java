package com.lavindu.inventory.demo;

import com.lavindu.inventory.demo.model.User;
import com.lavindu.inventory.demo.model.enums.Role;
import com.lavindu.inventory.demo.service.JwtService;
import com.lavindu.inventory.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserService userService;
    private final String frontendUrl;

    public OAuth2LoginSuccessHandler(JwtService jwtService,
                                     UserService userService,
                                     @org.springframework.beans.factory.annotation.Value("${frontend.url}") String frontendUrl) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        org.springframework.security.oauth2.core.user.OAuth2User oauth2User =
                (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();

        String email = (String) oauth2User.getAttributes().get("email");
        // create local user if missing
        User u = userService.findByEmail(email).orElseGet(() -> {
            User newU = new User();
            newU.setEmail(email.toLowerCase());
            newU.setUsername(email.toLowerCase());
            newU.setRole(Role.CUSTOMER);
            return userService.saveUser(newU);
        });

        String token = jwtService.generateToken(u.getUsername(), u.getRole().name());

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // set true in prod with HTTPS
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        response.sendRedirect(frontendUrl + "/oauth2/success");
    }
}

