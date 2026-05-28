package com.Ecommer.service;



import com.Ecommer.dto.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private RestTemplate restTemplate;


    public List<Product> searchByName(String keyword) {

        ResponseEntity<List<Product>> response =
                restTemplate.exchange("http://PRODUCT-SERVICE/products",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Product>>() {
                }
        );

        List<Product> products = response.getBody();

        List<Product> result = new ArrayList<>();

        if (products != null) {

            for (Product product : products) {

                if (product.getName().toLowerCase()
                        .contains(keyword.toLowerCase())) {

                    result.add(product);
                }
            }
        }
        return result;
    }
}