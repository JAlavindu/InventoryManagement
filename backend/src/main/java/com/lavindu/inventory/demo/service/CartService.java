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
        return cartRepo.findByCustomer(customerRepo.findById(customerId).orElse(null))
                .orElse(new Cart());
    }

    public Cart addToCart(Long customerId, Long productId, int quantity) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepo.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomer(customer);
                    return newCart;
                });

        cart.addItem(product, quantity);
        return cartRepo.save(cart);
    }

    public Cart removeFromCart(Long customerId, Long productId) {
        Cart cart = getCartByCustomerId(customerId);
        cart.getItems().removeIf(item -> item.getId().equals(productId));
        return cartRepo.save(cart);
    }

    public Cart clearCart(Long customerId) {
        Cart cart = getCartByCustomerId(customerId);
        cart.getItems().clear();
        return cartRepo.save(cart);
    }

}
