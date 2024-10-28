package com.Sever.Sever.DTO;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private int bookID;
    private String title;
    private String genre;
    private Date publicationdate;
    private double price;
    private String description;
    private int stockquantity;
    private String imageURL;
    private String publisher;
    private String isbn;

    private AuthorDTO author; // AuthorDTO sẽ chứa thông tin về Author
    private SupplierDTO supplier; // SupplierDTO sẽ chứa thông tin về Supplier
}

