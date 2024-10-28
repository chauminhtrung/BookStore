package com.Sever.Sever.Resp;

import com.Sever.Sever.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrderByCustomer_CustomerID(int id);
}
