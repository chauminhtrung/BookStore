package com.Sever.Sever.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Blog")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blogID;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    private int authorID;
    private String authortype;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date publisheddate;

    @Column(nullable = false)
    private String status;

    private String tags;
    private String imageURL;
}
