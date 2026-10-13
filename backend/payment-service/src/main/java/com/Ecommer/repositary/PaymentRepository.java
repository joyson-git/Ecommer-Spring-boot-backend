package com.Ecommer.repositary;

import com.Ecommer.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository  extends MongoRepository<Payment,String> {
    Optional<Payment> findByOrderId(String orderId);
}
