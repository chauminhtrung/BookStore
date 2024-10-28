package com.Sever.Sever.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDTO {
    private int authorID;  // ID của tác giả
    private String name;   // Tên tác giả
    private String biography; // Tiểu sử tác giả
    private String nationality; // Quốc tịch tác giả
}
