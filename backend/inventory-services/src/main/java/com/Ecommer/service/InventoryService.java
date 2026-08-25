package com.Ecommer.service;

import com.Ecommer.model.Inventory;
import com.Ecommer.repositary.InventoryRepositary;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class InventoryService {

    private final InventoryRepositary inventoryRepositary;


    public InventoryService(InventoryRepositary inventoryRepositary) {
        this.inventoryRepositary = inventoryRepositary;
    }

    // 1. Store Inventory: Fetch all inventory items for a specific store
    public List<Inventory> getStoreInventory(String storeId) {
        return inventoryRepositary.findByStoreId(storeId);
    }

    // 2. Stock Quantity: Get total physical quantity for a product in a store
    public Integer getStockQuantity(String storeId, String productId) {
        return inventoryRepositary.findByStoreIdAndProductId(storeId, productId)
                .map(Inventory::getQuantity)
                .orElse(0);
    }

    //3. Stock Reservation: Lock quantity when an order is placed
    public boolean reserverStock(String storeId, String productId, int amount) {
        Optional<Inventory> opt = inventoryRepositary.findByStoreIdAndProductId(storeId,productId);
        if(opt.isPresent()){
            Inventory item = opt.get();
            if(item.getAvailableQuantity()>=amount)
           item.setReserveQuantity(item.getReserveQuantity()+ amount);
            item.setAvailableQuantity(item.getQuantity()-item.getReserveQuantity());
            item.setUpdatedAt(LocalDateTime.now());
            inventoryRepositary.save(item);
            return  true;
        }
        return false;
    }

// 4. Stock Release: Free up reserved units on order cancellation/timeout
public  boolean releaseStock (String storeId,String productId,int amount){
    Optional<Inventory> opt = inventoryRepositary.findByStoreIdAndProductId(storeId,productId);
    if(opt.isPresent()){
        Inventory item = opt.get();
        int updatedReserve = Math.max(0, item.getReserveQuantity() -amount);
        item.setReserveQuantity(updatedReserve);
        item.setAvailableQuantity(item.getQuantity() - updatedReserve);
        item.setUpdatedAt(LocalDateTime.now());
        inventoryRepositary.save(item);
        return true;
    }
return false;
}

    // 5. Stock Updates: Restock or adjust base physical quantity
    public Inventory updateStockQuantity(String storeId, String productId, int newQuantity) {
        Inventory item = inventoryRepositary.findByStoreIdAndProductId(storeId, productId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        item.setQuantity(newQuantity);
        item.setAvailableQuantity(newQuantity - (item.getReserveQuantity() != null ? item.getReserveQuantity() : 0));
        item.setUpdatedAt(LocalDateTime.now());
        return inventoryRepositary.save(item);
    }

    // 6. Low-Stock Detection: Retrieve items where available stock <= reorderLevel
    public List<Inventory> detectLowStock(String storeId) {
        return inventoryRepositary.findByStoreId(storeId).stream()
                .filter(item -> item.getAvailableQuantity() != null
                        && item.getReorderLevel() != null
                        && item.getAvailableQuantity() <= item.getReorderLevel())
                .collect(Collectors.toList());
    }

    // 7. Store Availability: Check if sufficient stock is available to purchase
    public boolean isAvailable(String storeId, String productId, int requestedAmount) {
        return inventoryRepositary.findByStoreIdAndProductId(storeId, productId)
                .map(item -> item.getAvailableQuantity() >= requestedAmount)
                .orElse(false);
    }

    // 8. AI-Based Inventory Recommendations: Rule-based recommendation engine for restock quantity
    public String getAiInventoryRecommendation(String storeId, String productId) {
        Optional<Inventory> opt = inventoryRepositary.findByStoreIdAndProductId(storeId, productId);
        if (opt.isEmpty()) {
            return "No inventory record found for analysis.";
        }

        Inventory item = opt.get();
        int available = item.getAvailableQuantity() != null ? item.getAvailableQuantity() : 0;
        int reorder = item.getReorderLevel() != null ? item.getReorderLevel() : 0;
        int reserved = item.getReserveQuantity() != null ? item.getReserveQuantity() : 0;

        if (available == 0) {
            int suggestedRestock = (reorder * 3) + reserved;
            return "URGENT RESTOCK: Stock is depleted. Recommended reorder: " + suggestedRestock + " units.";
        } else if (available <= reorder) {
            int suggestedRestock = (reorder * 2) - available;
            return "WARNING: Approaching threshold. Recommended reorder: " + suggestedRestock + " units.";
        } else if (available > (reorder * 4)) {
            return "OPTIMAL: Overstocked. Consider running promotional discounts to clear storage.";
        }

        return "HEALTHY: Inventory levels are balanced within normal operating range.";
    }
}