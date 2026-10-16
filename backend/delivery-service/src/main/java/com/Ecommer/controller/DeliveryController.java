package com.ecommer.controller;

import com.ecommer.dto.AssignDeliveryRequest;
import com.ecommer.dto.UpdateDeliveryStatusRequest;
import com.ecommer.model.Delivery;
import com.ecommer.service.DeliveryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    // Create a new delivery schedule/order
    @PostMapping
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        Delivery createdDelivery = deliveryService.createDelivery(delivery);
        return new ResponseEntity<>(createdDelivery, HttpStatus.CREATED);
    }

    // Get all deliveries or filter by status
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries(@RequestParam(required = false) String status) {
        if (status != null && !status.trim().isEmpty()) {
            return ResponseEntity.ok(deliveryService.getDeliveriesByStatus(status));
        }
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }

    // Get delivery details by Delivery ID
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDeliveryById(@PathVariable String id) {
        return deliveryService.getDeliveryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get delivery details by Order ID
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Delivery> getDeliveryByOrderId(@PathVariable String orderId) {
        return deliveryService.getDeliveryByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get deliveries for a specific customer/user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Delivery>> getDeliveriesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(deliveryService.getDeliveriesByUserId(userId));
    }

    // Get deliveries assigned to a delivery partner
    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<List<Delivery>> getDeliveriesByPartnerId(@PathVariable String partnerId) {
        return ResponseEntity.ok(deliveryService.getDeliveriesByPartnerId(partnerId));
    }

    // Assign a delivery partner to an order
    @PutMapping("/{id}/assign")
    public ResponseEntity<Delivery> assignDeliveryPartner(@PathVariable String id,
                                                          @RequestBody AssignDeliveryRequest request) {
        try {
            Delivery updatedDelivery = deliveryService.assignDeliveryPartner(id, request);
            return ResponseEntity.ok(updatedDelivery);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update delivery status (PICKED_UP, OUT_FOR_DELIVERY, DELIVERED, FAILED)
    @PutMapping("/{id}/status")
    public ResponseEntity<Delivery> updateDeliveryStatus(@PathVariable String id,
                                                         @RequestBody UpdateDeliveryStatusRequest request) {
        try {
            Delivery updatedDelivery = deliveryService.updateDeliveryStatus(id, request);
            return ResponseEntity.ok(updatedDelivery);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Cancel delivery
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Delivery> cancelDelivery(@PathVariable String id) {
        try {
            Delivery cancelledDelivery = deliveryService.cancelDelivery(id);
            return ResponseEntity.ok(cancelledDelivery);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete / cancel delivery endpoint
    @DeleteMapping("/{id}")
    public ResponseEntity<Delivery> deleteDelivery(@PathVariable String id) {
        try {
            Delivery cancelledDelivery = deliveryService.cancelDelivery(id);
            return ResponseEntity.ok(cancelledDelivery);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
