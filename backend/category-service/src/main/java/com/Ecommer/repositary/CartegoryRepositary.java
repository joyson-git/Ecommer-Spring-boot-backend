package com.Ecommer.repositary;

import com.Ecommer.model.Cartegory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartegoryRepositary  extends MongoRepository<Cartegory,String> {


}
