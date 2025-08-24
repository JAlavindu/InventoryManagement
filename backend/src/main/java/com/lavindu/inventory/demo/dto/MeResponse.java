package com.lavindu.inventory.demo.dto;

import com.lavindu.inventory.demo.model.Cart;

public class MeResponse {

    private String username;
    private String email;
    private String role;
    private String customerName;

    public MeResponse(String username, String email, String name, String s) {
        this.username = username;
        this.email = email;
        this.customerName = name;
        this.role = s;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
