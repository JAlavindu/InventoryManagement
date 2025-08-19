package com.lavindu.inventory.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @ManyToOne
    private Product product;

    @Setter
    private int quantity;

    @ManyToOne
    private Cart cart;

    public Object getId() {
        return id;
    }

}
