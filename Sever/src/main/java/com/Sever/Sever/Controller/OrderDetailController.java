package com.Sever.Sever.Controller;

import com.Sever.Sever.DTO.OrderDetailDTO;
import com.Sever.Sever.Model.Order;
import com.Sever.Sever.Model.OrderDetail;
import com.Sever.Sever.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orderdetails")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // Lấy danh sách tất cả chi tiết đơn hàng
    @GetMapping
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    // Lấy thông tin chi tiết đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable int id) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderDetailById(id);
        return orderDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("or-Id/{orderid}")
    public ResponseEntity<List<OrderDetailDTO>> getAllOrderDetailsbyOrderid(@PathVariable int orderid) {
        List<OrderDetailDTO> orderDetailDTOs = orderDetailService.getAllOrderDetailsbyOrderid(orderid);
        return ResponseEntity.ok(orderDetailDTOs);
    }


    // Tạo mới chi tiết đơn hàng
    @PostMapping
    public OrderDetail createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return orderDetailService.createOrderDetail(orderDetail);
    }

    // Cập nhật thông tin chi tiết đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable int id, @RequestBody OrderDetail updatedOrderDetail) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderDetailById(id);
        if (orderDetail.isPresent()) {
            return ResponseEntity.ok(orderDetailService.updateOrderDetail(id, updatedOrderDetail));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa chi tiết đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable int id) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderDetailById(id);
        if (orderDetail.isPresent()) {
            orderDetailService.deleteOrderDetail(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
