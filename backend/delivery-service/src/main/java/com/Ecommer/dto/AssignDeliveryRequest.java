package com.ecommer.dto;

import java.time.LocalDateTime;

public class AssignDeliveryRequest {

    private String deliveryPartnerId;
    private String deliveryPartnerName;
    private String deliveryPartnerPhone;
    private LocalDateTime estimatedDeliveryTime;
    private String notes;

    public AssignDeliveryRequest() {}

    public AssignDeliveryRequest(String deliveryPartnerId, String deliveryPartnerName,
                                 String deliveryPartnerPhone, LocalDateTime estimatedDeliveryTime,
                                 String notes) {
        this.deliveryPartnerId = deliveryPartnerId;
        this.deliveryPartnerName = deliveryPartnerName;
        this.deliveryPartnerPhone = deliveryPartnerPhone;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.notes = notes;
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

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
