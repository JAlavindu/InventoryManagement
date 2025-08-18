package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.Cart;
import com.lavindu.inventory.demo.repo.CartRepo;
import com.lavindu.inventory.demo.repo.CustomerRepo;
import com.lavindu.inventory.demo.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;

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
        Cart cart = getCartByCustomerId(customerId);
        cart.addItem(productRepo.findById(productId).orElse(null), quantity);
        return cartRepo.save(cart);
    }

}
