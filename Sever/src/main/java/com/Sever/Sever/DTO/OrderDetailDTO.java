package com.Sever.Sever.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    private int orderdetailID;
    private int orderID;
    private int bookID;
    private String bookTitle;  // Nếu muốn gửi thêm tên sách
    private String bookImage;  // Nếu muốn gửi thêm tên sách
    private int quantity;
    private double unitprice;
}
