package com.lavindu.inventory.demo.repo;

import com.lavindu.inventory.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

}
