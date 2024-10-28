package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "Customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerID;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phonenumber;
    private String address;

    @Column(nullable = false)
    private String passwordhash;

    // One-to-Many relationship with BookReview
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "Book-Customer") // Ngăn tuần tự hóa ngược lại từ BookReview để tránh vòng lặp
    private List<BookReview> bookReviews;

    // One-to-Many relationship with Orders
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "Orders-Customer") // Ngăn việc tuần tự hóa ngược lại từ Orders về Customer
    private List<Order> orders;
}
