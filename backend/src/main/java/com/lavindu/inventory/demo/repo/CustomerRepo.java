package com.lavindu.inventory.demo.repo;

import com.lavindu.inventory.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUserId(Long customerId);
}
