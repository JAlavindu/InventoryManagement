package com.lavindu.inventory.demo.repo;

import com.lavindu.inventory.demo.model.Cart;
import com.lavindu.inventory.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCustomer(Customer customer);

    Optional<Cart> findByCustomerId(Long customerId);
}
