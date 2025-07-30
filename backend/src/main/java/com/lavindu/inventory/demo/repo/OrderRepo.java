package com.lavindu.inventory.demo.repo;

import com.lavindu.inventory.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {

}
