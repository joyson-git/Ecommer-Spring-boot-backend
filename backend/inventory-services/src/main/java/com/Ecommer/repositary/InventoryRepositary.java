package com.Ecommer.repositary;

import com.Ecommer.model.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import java.util.List;

@Repository
public interface InventoryRepositary extends MongoRepository<Inventory,String> {

    List<Inventory> findByStoreId(String storeId);
    List<Inventory> findByProductId(String productId);
    List<Inventory> findByQuantity(Integer quantity);
    List<Inventory> findByReserveQuantity(Integer reserveQuantity);
    Optional<Inventory> findByStoreIdAndProductId(String storeId, String productId);

}
