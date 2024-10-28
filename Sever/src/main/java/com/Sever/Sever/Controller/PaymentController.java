package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.Payment;
import com.Sever.Sever.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Lấy danh sách tất cả các thanh toán
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Lấy thông tin thanh toán theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable int id) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới thanh toán
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    // Cập nhật thông tin thanh toán
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable int id, @RequestBody Payment updatedPayment) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            return ResponseEntity.ok(paymentService.updatePayment(id, updatedPayment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa thanh toán
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable int id) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            paymentService.deletePayment(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
