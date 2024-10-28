package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Orderdetails")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderdetailID;

    @JsonBackReference(value = "order-orderdetail")
    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "bookID", nullable = false)
    @JsonBackReference(value = "book-orderdetails") // Tham chiếu quản lý
    private Book orderbook;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double unitprice;
}
