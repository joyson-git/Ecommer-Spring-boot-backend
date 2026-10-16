package com.ecommer.repository;

import com.ecommer.model.AuthUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AuthRepository extends MongoRepository<AuthUser,String> {

    Optional<AuthUser> findByEmail(String email);
}
