package com.ecommer.repository;

import com.ecommer.model.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends MongoRepository<Delivery, String> {

    Optional<Delivery> findByOrderId(String orderId);

    List<Delivery> findByUserId(String userId);

    List<Delivery> findByDeliveryPartnerId(String deliveryPartnerId);

    List<Delivery> findByStatus(String status);
}
