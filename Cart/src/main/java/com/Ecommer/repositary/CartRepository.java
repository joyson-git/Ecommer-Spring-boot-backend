package com.Ecommer.repositary;

import com.Ecommer.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends MongoRepository<Cart,String> {


    List<Cart>  findByUserId(String userId);
}
