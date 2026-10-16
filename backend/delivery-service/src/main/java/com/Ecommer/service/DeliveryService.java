package com.ecommer.service;

import com.ecommer.dto.AssignDeliveryRequest;
import com.ecommer.dto.UpdateDeliveryStatusRequest;
import com.ecommer.model.Delivery;
import com.ecommer.model.DeliveryStatus;
import com.ecommer.repository.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public Delivery createDelivery(Delivery delivery) {
        if (delivery.getTrackingNumber() == null || delivery.getTrackingNumber().trim().isEmpty()) {
            delivery.setTrackingNumber("TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (delivery.getStatus() == null) {
            delivery.setStatus(DeliveryStatus.PENDING.name());
        }
        delivery.setCreatedAt(LocalDateTime.now());
        delivery.setUpdatedAt(LocalDateTime.now());
        return deliveryRepository.save(delivery);
    }

    public Optional<Delivery> getDeliveryById(String id) {
        return deliveryRepository.findById(id);
    }

    public Optional<Delivery> getDeliveryByOrderId(String orderId) {
        return deliveryRepository.findByOrderId(orderId);
    }

    public List<Delivery> getDeliveriesByUserId(String userId) {
        return deliveryRepository.findByUserId(userId);
    }

    public List<Delivery> getDeliveriesByPartnerId(String partnerId) {
        return deliveryRepository.findByDeliveryPartnerId(partnerId);
    }

    public List<Delivery> getDeliveriesByStatus(String status) {
        return deliveryRepository.findByStatus(status.toUpperCase());
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Delivery assignDeliveryPartner(String deliveryId, AssignDeliveryRequest request) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found with id: " + deliveryId));

        delivery.setDeliveryPartnerId(request.getDeliveryPartnerId());
        delivery.setDeliveryPartnerName(request.getDeliveryPartnerName());
        delivery.setDeliveryPartnerPhone(request.getDeliveryPartnerPhone());
        if (request.getEstimatedDeliveryTime() != null) {
            delivery.setEstimatedDeliveryTime(request.getEstimatedDeliveryTime());
        }
        if (request.getNotes() != null) {
            delivery.setNotes(request.getNotes());
        }
        delivery.setStatus(DeliveryStatus.ASSIGNED.name());
        delivery.setUpdatedAt(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }

    public Delivery updateDeliveryStatus(String deliveryId, UpdateDeliveryStatusRequest request) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found with id: " + deliveryId));

        delivery.setStatus(request.getStatus().name());
        if (request.getNotes() != null) {
            delivery.setNotes(request.getNotes());
        }
        if (request.getStatus() == DeliveryStatus.DELIVERED) {
            delivery.setDeliveredAt(LocalDateTime.now());
        }
        delivery.setUpdatedAt(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }

    public Delivery cancelDelivery(String deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found with id: " + deliveryId));

        delivery.setStatus(DeliveryStatus.CANCELLED.name());
        delivery.setUpdatedAt(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }
}
