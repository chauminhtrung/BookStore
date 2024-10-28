package com.Sever.Sever.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "Authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorID;

    @Column(nullable = false)
    private String name;

    private String biography;
    private String nationality;

    // One-to-Many relationship with Books
    // "author" here is the name of the field in the Book class
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "author-books") // Đặt tên cho tham chiếu quản lý
    private List<Book> books;
}
