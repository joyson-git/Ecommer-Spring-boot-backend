package com.ecommer.service;

import com.ecommer.model.Inventory;
import com.ecommer.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // 1. Store Inventory: Fetch all inventory items for a specific store
    public List<Inventory> getStoreInventory(String storeId) {
        return inventoryRepository.findByStoreId(storeId);
    }

    // 2. Stock Quantity: Get total physical quantity for a product in a store
    public Integer getStockQuantity(String storeId, String productId) {
        return inventoryRepository.findByStoreIdAndProductId(storeId, productId)
                .map(Inventory::getQuantity)
                .orElse(0);
    }

    // 3. Stock Reservation: Lock quantity when an order is placed
    public boolean reserverStock(String storeId, String productId, int amount) {
        Optional<Inventory> opt = inventoryRepository.findByStoreIdAndProductId(storeId, productId);
        if (opt.isPresent()) {
            Inventory item = opt.get();
            int currentAvailable = item.getAvailableQuantity() != null ? item.getAvailableQuantity() : 0;
            int currentReserve = item.getReserveQuantity() != null ? item.getReserveQuantity() : 0;
            int totalQuantity = item.getQuantity() != null ? item.getQuantity() : 0;

            if (currentAvailable >= amount) {
                item.setReserveQuantity(currentReserve + amount);
                item.setAvailableQuantity(totalQuantity - item.getReserveQuantity());
                item.setUpdatedAt(LocalDateTime.now());
                inventoryRepository.save(item);
                return true;
            }
        }
        return false;
    }

    // 4. Stock Release: Free up reserved units on order cancellation/timeout
    public boolean releaseStock(String storeId, String productId, int amount) {
        Optional<Inventory> opt = inventoryRepository.findByStoreIdAndProductId(storeId, productId);
        if (opt.isPresent()) {
            Inventory item = opt.get();
            int currentReserve = item.getReserveQuantity() != null ? item.getReserveQuantity() : 0;
            int totalQuantity = item.getQuantity() != null ? item.getQuantity() : 0;
            int updatedReserve = Math.max(0, currentReserve - amount);
            item.setReserveQuantity(updatedReserve);
            item.setAvailableQuantity(totalQuantity - updatedReserve);
            item.setUpdatedAt(LocalDateTime.now());
            inventoryRepository.save(item);
            return true;
        }
        return false;
    }

    // 5. Stock Updates: Restock or adjust base physical quantity
    public Inventory updateStockQuantity(String storeId, String productId, int newQuantity) {
        Inventory item = inventoryRepository.findByStoreIdAndProductId(storeId, productId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        item.setQuantity(newQuantity);
        item.setAvailableQuantity(newQuantity - (item.getReserveQuantity() != null ? item.getReserveQuantity() : 0));
        item.setUpdatedAt(LocalDateTime.now());
        return inventoryRepository.save(item);
    }

    // 6. Low-Stock Detection: Retrieve items where available stock <= reorderLevel
    public List<Inventory> detectLowStock(String storeId) {
        return inventoryRepository.findByStoreId(storeId).stream()
                .filter(item -> item.getAvailableQuantity() != null
                        && item.getReorderLevel() != null
                        && item.getAvailableQuantity() <= item.getReorderLevel())
                .collect(Collectors.toList());
    }

    // 7. Store Availability: Check if sufficient stock is available to purchase
    public boolean isAvailable(String storeId, String productId, int requestedAmount) {
        return inventoryRepository.findByStoreIdAndProductId(storeId, productId)
                .map(item -> item.getAvailableQuantity() >= requestedAmount)
                .orElse(false);
    }

    // 8. AI-Based Inventory Recommendations: Rule-based recommendation engine for restock quantity
    public String getAiInventoryRecommendation(String storeId, String productId) {
        Optional<Inventory> opt = inventoryRepository.findByStoreIdAndProductId(storeId, productId);
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