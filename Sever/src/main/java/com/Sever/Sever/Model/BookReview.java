package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Bookreviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewID;

    @ManyToOne
    @JoinColumn(name = "bookID", nullable = false)
    @JsonBackReference(value = "book-reviews") // Chú thích này ngăn tuần tự hóa ngược
    private Book book;

    @ManyToOne
    @JoinColumn(name = "customerID", nullable = false)
    @JsonBackReference(value = "Book-Customer") // Quản lý mối quan hệ với Customer
    private Customer customer;

    @Column(nullable = false)
    private String reviewcontent;

    @Column(nullable = false)
    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date reviewdate;
}
