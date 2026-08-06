package com.Ecommer.repositary;

import com.Ecommer.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {

    List<Order> findByUserId(String userId);
}
