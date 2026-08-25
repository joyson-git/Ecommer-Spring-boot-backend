package com.Ecommer.controller;


import com.Ecommer.model.Inventory;
import com.Ecommer.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // 1. Get Store Inventory
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<Inventory>> getStoreInventory(@PathVariable String storeId) {
        List<Inventory> inventoryList = inventoryService.getStoreInventory(storeId);
        return ResponseEntity.ok(inventoryList);
    }


    // 2. Get Stock Quantity
    @GetMapping("/quantity")
    public ResponseEntity<Integer> getStockQuantity(@RequestParam String storeId, @RequestParam String productId) {
        Integer quantity = inventoryService.getStockQuantity(storeId, productId);
        return ResponseEntity.ok(quantity);
    }

    // 3. Stock Reservation
    @PostMapping("/reserve")
    public ResponseEntity<String> reserveStock(@RequestParam String storeId, @RequestParam String productId, @RequestParam int amount) {
        boolean reserved = inventoryService.reserverStock(storeId, productId, amount);
        if (reserved) {
            return ResponseEntity.ok("Stock succesful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failed to reserve stock ");
        }
    }


    //4 stock release
    @PostMapping("/release")
    public ResponseEntity<String> releaseStock(@RequestParam String storedId, @RequestParam String productId, @RequestParam int amount) {
        boolean released = inventoryService.releaseStock(storedId,productId,amount);
if(released){
    return ResponseEntity.ok(" The Successful");
}
return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to release stock: Item not found.");
    }

// 5. Update Stock Quantity
@PutMapping("/update-stock")
public ResponseEntity<Inventory> updateStockQuantity(@RequestParam String storeId,@RequestParam String productId, @RequestParam int newQuantity){
        try{
Inventory updated = inventoryService.updateStockQuantity(storeId,productId,newQuantity);
return ResponseEntity.ok(updated);
        }catch (RuntimeException e){
return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
}

////6 -- low-stock detection
//    @GetMapping("/low-stock/{storedId}")
// public ResponseEntity<List<Inventory>> getLowStockItems(@PathVariable String storeId){
//        List<Inventory> lowStockItem = inventoryService.detectLowStock(storeId);
//        return ResponseEntity.ok(lowStockItem);
//    }
//// 7. Store Availability Check
//    @GetMapping("/check-availability")
//    public ResponseEntity<Boolean> checkAvailability(@RequestParam String storeId, @RequestParam String productId, @RequestParam int requestedAmount){
//boolean isAvailable = inventoryService.isAvailable(storeId,productId,requestedAmount);
//return ResponseEntity.ok(isAvailable);
//    }
//
//
//// 8. AI-Based Inventory Recommendations
//@GetMapping("/ai-recommedation")
//public ResponseEntity<String> getAiRecommandation(@RequestParam String storeId , @RequestParam String productId){
//        String recommendation = inventoryService.getAiInventoryRecommendation(storeId,productId);
//        return ResponseEntity.ok(recommendation);
//}


}
