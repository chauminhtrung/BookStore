package com.Sever.Sever.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // Tự động tạo getter, setter, toString, equals, hashCode
@AllArgsConstructor  // Tạo constructor với tất cả các tham số
@NoArgsConstructor  // Tạo constructor không tham số
public class LoginRequest {
    private String phone;
    private String password;
}
