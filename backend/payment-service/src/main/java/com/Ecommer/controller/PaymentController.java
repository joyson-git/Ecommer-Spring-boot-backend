package com.ecommer.controller;

import com.ecommer.model.Payment;
import com.ecommer.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

//    Payment creation
//    Payment verification
//    Payment status
//    Refunds
//    Payment failures

//    POST /payments
//    GET  /payments/{id}
//    POST /payments/{id}/verify
//    POST /payments/{id}/refund

    @Autowired
    private PaymentService paymentService;

    //    Payment creation
    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.processPayment(payment);
    }

//    Payment verification
@GetMapping("/{orderId}")
public Payment makeVerification(@PathVariable String orderId) {
    return paymentService.verifyPayment(orderId);
}
    //    Payment status
@PostMapping("/{id}/verify")
public  Payment makePaymentstatus(@PathVariable String id){
return paymentService.verifyPayment(id);
}



    //    Refunds
@PostMapping("/{id}/refund")
public  Payment makeRefund(@PathVariable String id){
 return paymentService.refundPayment(id);
}



}