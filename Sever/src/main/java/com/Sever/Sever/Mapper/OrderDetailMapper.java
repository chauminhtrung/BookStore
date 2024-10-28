package com.Sever.Sever.Mapper;

import com.Sever.Sever.DTO.OrderDetailDTO;
import com.Sever.Sever.Model.OrderDetail;

public class OrderDetailMapper {
    public static OrderDetailDTO toDTO(OrderDetail orderDetail) {
        return new OrderDetailDTO(
                orderDetail.getOrderdetailID(),
                orderDetail.getOrder().getOrderID(),       // Giả sử Order có phương thức getOrderID()
                orderDetail.getOrderbook().getBookID(),
                orderDetail.getOrderbook().getTitle(),
                orderDetail.getOrderbook().getImageURL(),// Giả sử Book có phương thức getBookID()
                orderDetail.getQuantity(),
                orderDetail.getUnitprice()
        );
    }
}
