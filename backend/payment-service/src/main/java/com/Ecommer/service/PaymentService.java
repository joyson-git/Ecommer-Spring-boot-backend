package com.ecommer.service;

import com.ecommer.model.Payment;
import com.ecommer.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

 public Payment processPayment(Payment payment){
     payment.setStatus("Sucess");
     return paymentRepository.save(payment);
 }


    public Payment verifyPayment(String orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));
    }


    // Refund
    public Payment refundPayment(String orderId) {

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        if (!"SUCCESS".equals(payment.getStatus())) {
            throw new RuntimeException(
                    "Only successful payments can be refunded"
            );
        }

        payment.setStatus("REFUNDED");

        return paymentRepository.save(payment);
    }
}
