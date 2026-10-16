package com.ecommer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "deliveries")
public class Delivery {

    @Id
    private String id;
    private String orderId;
    private String userId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String shippingAddress;
    private String deliveryPartnerId;
    private String deliveryPartnerName;
    private String deliveryPartnerPhone;
    private String status; // PENDING, ASSIGNED, PICKED_UP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, FAILED
    private String trackingNumber;
    private String notes;
    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime deliveredAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Delivery() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = DeliveryStatus.PENDING.name();
    }

    public Delivery(String id, String orderId, String userId, String customerName,
                    String customerEmail, String customerPhone, String shippingAddress,
                    String deliveryPartnerId, String deliveryPartnerName, String deliveryPartnerPhone,
                    String status, String trackingNumber, String notes,
                    LocalDateTime estimatedDeliveryTime, LocalDateTime deliveredAt,
                    LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.orderId = orderId;
        this.userId = userId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.shippingAddress = shippingAddress;
        this.deliveryPartnerId = deliveryPartnerId;
        this.deliveryPartnerName = deliveryPartnerName;
        this.deliveryPartnerPhone = deliveryPartnerPhone;
        this.status = status;
        this.trackingNumber = trackingNumber;
        this.notes = notes;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.deliveredAt = deliveredAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getDeliveryPartnerId() {
        return deliveryPartnerId;
    }

    public void setDeliveryPartnerId(String deliveryPartnerId) {
        this.deliveryPartnerId = deliveryPartnerId;
    }

    public String getDeliveryPartnerName() {
        return deliveryPartnerName;
    }

    public void setDeliveryPartnerName(String deliveryPartnerName) {
        this.deliveryPartnerName = deliveryPartnerName;
    }

    public String getDeliveryPartnerPhone() {
        return deliveryPartnerPhone;
    }

    public void setDeliveryPartnerPhone(String deliveryPartnerPhone) {
        this.deliveryPartnerPhone = deliveryPartnerPhone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
