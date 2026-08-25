package com.Ecommer.repository;

import com.Ecommer.model.AuthUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AuthRepository extends MongoRepository<AuthUser,String> {

    Optional<AuthUser> findByEmail(String email);
}
