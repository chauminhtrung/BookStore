package com.Sever.Sever.DTO.Respone;

import com.Sever.Sever.Model.BookReview;
import com.Sever.Sever.Model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data  // Tự động tạo getter, setter, toString, equals, hashCode
@AllArgsConstructor  // Tạo constructor với tất cả các tham số
@NoArgsConstructor  // Tạo constructor không tham số
public class LoginResponse {
    private int customerID;
    private String name;
    private String email;
    private String phonenumber;
    private String address;
    private List<BookReview> bookReviews;
    private List<Order> orders;
}
