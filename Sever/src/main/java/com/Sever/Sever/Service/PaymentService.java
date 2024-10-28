package com.Sever.Sever.Service;

import com.Sever.Sever.Model.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<Payment> getAllPayments();
    Optional<Payment> getPaymentById(int id);
    Payment createPayment(Payment payment);
    Payment updatePayment(int id, Payment payment);
    void deletePayment(int id);
}
