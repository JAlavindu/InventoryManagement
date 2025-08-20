package com.lavindu.inventory.demo.controller;

import com.lavindu.inventory.demo.model.Cart;
import com.lavindu.inventory.demo.model.Customer;
import com.lavindu.inventory.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{customerId}")
    private ResponseEntity<Cart> getCart(@PathVariable Long customerId) {
        return new ResponseEntity<>(cartService.getCartByCustomerId(customerId), HttpStatus.OK);
    }

    @PostMapping("/{customerId}/add")
    public ResponseEntity<Cart> addToCart(
            @PathVariable Long customerId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(customerId, productId, quantity));
    }

    @PostMapping("/{customerId}/remove")
    public ResponseEntity<Cart> removeFromCart(
        @PathVariable Long customerId,
        @RequestParam Long productId) {
        return ResponseEntity.ok(cartService.removeFromCart(customerId, productId));
    }

    @DeleteMapping("/{customerId}/clear")
    public ResponseEntity<Cart> clearCart(@PathVariable Long customerId) {
        return ResponseEntity.ok(cartService.clearCart(customerId));
    }



}
