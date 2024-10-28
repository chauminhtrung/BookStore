package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Payment;
import com.Sever.Sever.Resp.PaymentRepository;
import com.Sever.Sever.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findById(id);
    }

    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment updatePayment(int id, Payment updatedPayment) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setPaymentdate(updatedPayment.getPaymentdate());
                    payment.setPaymentmethod(updatedPayment.getPaymentmethod());
                    payment.setAmount(updatedPayment.getAmount());
                    return paymentRepository.save(payment);
                }).orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }
}
