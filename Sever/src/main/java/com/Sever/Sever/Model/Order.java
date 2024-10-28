package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;

    @ManyToOne
    @JoinColumn(name = "customerID", nullable = false)
    @JsonBackReference (value = "Orders-Customer")
    private Customer customer;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date orderdate;

    @Column(nullable = false)
    private double totalprice;

    @Column(nullable = false)
    private String orderstatus;

    private String shippingaddress;
    private String paymentmethod;

    @JsonManagedReference(value = "order-orderdetail")
    @OneToMany(mappedBy = "order")
    private List<OrderDetail> OrderDetail;


}
