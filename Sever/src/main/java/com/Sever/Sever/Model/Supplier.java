package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "Suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int supplierID;

    @Column(nullable = false)
    private String suppliername;

    private String contactinfo;
    private String address;
    private String phonenumber;

    // One-to-Many relationship with Books
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "supplier-books")
    private List<Book> books;
}
