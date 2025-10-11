package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.Cart;
import com.lavindu.inventory.demo.model.Customer;
import com.lavindu.inventory.demo.model.Product;
import com.lavindu.inventory.demo.repo.CartRepo;
import com.lavindu.inventory.demo.repo.CustomerRepo;
import com.lavindu.inventory.demo.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CustomerRepo customerRepo;

    public Cart getCartByCustomerId(Long customerId) {
        Customer customer = customerRepo.findByUserId(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return cartRepo.findByCustomer(customer)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomer(customer);
                    return cartRepo.save(newCart);
                });
    }

//    public Cart addToCart(Long customerId, Long productId, int quantity) {
//        Customer customer = customerRepo.findByUserId(customerId)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//
//        Product product = productRepo.findById(productId)
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//
//        Cart cart = cartRepo.findByCustomerId(customerId)
//                .orElseGet(() -> {
//                    Cart newCart = new Cart();
//                    newCart.setCustomer(customer);
//                    return newCart;
//                });
//
//        cart.addItem(product, quantity);
//        return cartRepo.save(cart);
//    }

    public Cart addToCart(Long customerId, Long productId, int quantity) {
        Customer customer = customerRepo.findByUserId(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Use findByCustomer instead of findByCustomerId for consistency
        Cart cart = cartRepo.findByCustomer(customer)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomer(customer);
                    return cartRepo.save(newCart);  // ✅ Save immediately
                });

        cart.addItem(product, quantity);
        return cartRepo.save(cart);
    }

    public Cart removeFromCart(Long customerId, Long productId) {
        Cart cart = getCartByCustomerId(customerId);
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        return cartRepo.save(cart);
    }

    public Cart clearCart(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        cart.getItems().clear();
        return cartRepo.save(cart);
    }

    public Cart saveCart(Cart cart) {
        return cartRepo.save(cart);
    }
}
