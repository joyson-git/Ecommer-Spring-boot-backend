package com.Ecommer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Inventory")
public class Inventory {

    @Id
    private String id;
    private String storeId;
    private String productId;
    private Integer quantity;
    private Integer reserveQuantity;
    private Integer availableQuantity;
    private Integer reorderLevel;
    private LocalDateTime updatedAt;

    public Inventory() {}

    public Inventory(String id, String storeId, String productId, Integer quantity,
                     Integer reserveQuantity, Integer availableQuantity,
                     Integer reorderLevel, LocalDateTime updatedAt) {
        this.id = id;
        this.storeId = storeId;
        this.productId = productId;
        this.quantity = quantity;
        this.reserveQuantity = reserveQuantity;
        this.availableQuantity = availableQuantity;
        this.reorderLevel = reorderLevel;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getReserveQuantity() {
        return reserveQuantity;
    }

    public void setReserveQuantity(Integer reserveQuantity) {
        this.reserveQuantity = reserveQuantity;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Integer getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}