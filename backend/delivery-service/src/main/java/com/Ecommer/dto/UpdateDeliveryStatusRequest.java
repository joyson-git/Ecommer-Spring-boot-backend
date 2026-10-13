package com.Ecommer.dto;

import com.Ecommer.model.DeliveryStatus;

public class UpdateDeliveryStatusRequest {

    private DeliveryStatus status;
    private String notes;

    public UpdateDeliveryStatusRequest() {}

    public UpdateDeliveryStatusRequest(DeliveryStatus status, String notes) {
        this.status = status;
        this.notes = notes;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
