package com.Ecommer.service;

import com.Ecommer.model.Payment;
import com.Ecommer.repositary.PaymentRepository;
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



}
