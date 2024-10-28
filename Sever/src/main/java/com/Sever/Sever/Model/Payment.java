package com.Sever.Sever.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentID;

    @ManyToOne
    @JoinColumn(name = "orderID", nullable = false)
    private Order order;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date paymentdate;

    private String paymentmethod;

    @Column(nullable = false)
    private double amount;
}
