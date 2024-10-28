package com.Sever.Sever.Service;

import com.Sever.Sever.Model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> getAllOrders();
    List<Order> getAllByUernamdId(int id);
    Optional<Order> getOrderById(int id);
    Order createOrder(Order order);
    Order updateOrder(int id, Order order);
    void deleteOrder(int id);
}
