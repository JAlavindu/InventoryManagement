package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.Customer;
import com.lavindu.inventory.demo.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepo.save(customer);
    }
}
