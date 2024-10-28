package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookID;

    @Column(nullable = false)
    private String title;

    // Many-to-One relationship with Author
    @ManyToOne
    @JoinColumn(name = "authorID", nullable = false)
    @JsonBackReference(value = "author-books") // Đặt tên cho tham chiếu ngược
    private Author author;

    private String genre;

    @Temporal(TemporalType.DATE)
    private Date publicationdate;

    @Column(nullable = false)
    private double price;

    private String description;
    private int stockquantity;
    private String imageURL;
    private String publisher;

    @Column(unique = true)
    private String isbn;

    // Many-to-One relationship with Supplier
    @ManyToOne
    @JoinColumn(name = "supplierID", nullable = false) // Khóa ngoại đến bảng Suppliers
    @JsonBackReference(value = "supplier-books") // Đặt tên cho tham chiếu ngược
    private Supplier supplier;

    // Mối quan hệ One-to-Many với BookReview
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "book-reviews") // Chú thích này dùng để quản lý
    private List<BookReview> bookReviews;

    // Mối quan hệ One-to-Many với OrderDetail
    @OneToMany(mappedBy = "orderbook", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "book-orderdetails") // Chú thích này dùng để quản lý
    private List<OrderDetail> orderDetails;


}
