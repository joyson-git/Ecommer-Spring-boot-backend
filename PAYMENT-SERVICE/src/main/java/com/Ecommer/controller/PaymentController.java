package com.Ecommer.controller;

import com.Ecommer.model.Payment;
import com.Ecommer.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment makePayment(
            @RequestBody Payment payment) {

        return paymentService.processPayment(payment);
    }
}