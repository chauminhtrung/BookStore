package com.Sever.Sever.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {
    private int supplierID; // ID của nhà cung cấp
    private String name;    // Tên nhà cung cấp
    private String address; // Địa chỉ nhà cung cấp
    private String contact; // Thông tin liên lạc của nhà cung cấp
}
