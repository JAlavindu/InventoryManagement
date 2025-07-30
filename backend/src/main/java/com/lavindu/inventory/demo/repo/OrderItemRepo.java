package com.lavindu.inventory.demo.repo;

import com.lavindu.inventory.demo.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}
