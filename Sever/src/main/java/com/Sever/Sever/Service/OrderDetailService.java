package com.Sever.Sever.Service;
import com.Sever.Sever.DTO.OrderDetailDTO;
import com.Sever.Sever.Model.OrderDetail;

import java.util.List;
import java.util.Optional;

public interface OrderDetailService {
    List<OrderDetail> getAllOrderDetails();
    List<OrderDetailDTO> getAllOrderDetailsbyOrderid(int orderid);
    Optional<OrderDetail> getOrderDetailById(int id);
    OrderDetail createOrderDetail(OrderDetail orderDetail);
    OrderDetail updateOrderDetail(int id, OrderDetail orderDetail);
    void deleteOrderDetail(int id);
}
