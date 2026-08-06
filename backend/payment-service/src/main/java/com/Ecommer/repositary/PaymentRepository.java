package com.Ecommer.repositary;

import com.Ecommer.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository  extends MongoRepository<Payment,String> {
}
