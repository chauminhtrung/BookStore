package com.Sever.Sever.Resp;

import com.Sever.Sever.Model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findOrderDetailByOrder_OrderID(int orderId);
}
