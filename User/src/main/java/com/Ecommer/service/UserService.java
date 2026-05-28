package com.Ecommer.service;

import com.Ecommer.model.User;
import com.Ecommer.repositary.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Service
public class UserService {

private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public UserService(UserRepository userRepository, RestTemplate restTemplate){
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(String id, User user) {
        User existing = getUserById(id);
        if (existing != null) {
            existing.setFirstName(user.getFirstName());
            existing.setLastName(user.getLastName());
            existing.setEmail(user.getEmail());
            return userRepository.save(existing);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


    public String getProductsFromProductService() {
        return restTemplate.getForObject(
                "http://PRODUCT/product",
                String.class
        );
    }

}
