package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Order;
import com.Sever.Sever.Resp.OrderRepository;
import com.Sever.Sever.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getAllByUernamdId(int id) {
         return orderRepository.findOrderByCustomer_CustomerID(id);
    }

    @Override
    public Optional<Order> getOrderById(int id) {
        return orderRepository.findById(id);
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(int id, Order updatedOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setOrderstatus(updatedOrder.getOrderstatus());
                    order.setTotalprice(updatedOrder.getTotalprice());
                    order.setShippingaddress(updatedOrder.getShippingaddress());
                    return orderRepository.save(order);
                }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }
}
