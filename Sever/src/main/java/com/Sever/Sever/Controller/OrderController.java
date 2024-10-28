package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.BookReview;
import com.Sever.Sever.Model.Order;
import com.Sever.Sever.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Lấy danh sách tất cả các đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Lấy thông tin đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable int id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Lấy thông tin đánh giá sách theo ID
    @GetMapping("Cus-Id/{id}")
    public List<Order> getOrderbuUsernameId(@PathVariable int id) {
        return orderService.getAllByUernamdId(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    // Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable int id, @RequestBody Order updatedOrder) {
        return orderService.getOrderById(id)
                .map(order -> ResponseEntity.ok(orderService.updateOrder(id, updatedOrder)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int id) {
        if (orderService.getOrderById(id).isPresent()) {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
