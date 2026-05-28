package com.Ecommer.service;

import com.Ecommer.dto.Product;
import com.Ecommer.model.Cart;
import com.Ecommer.repositary.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CartService {

    private CartRepository cartRepository;
    private RestTemplate restTemplate;


    public  CartService(CartRepository cartRepository,RestTemplate restTemplate){
        this.cartRepository = cartRepository;
        this.restTemplate =restTemplate;
    }

public  String addToCart(Cart cart){
        cartRepository.save(cart);
        return " the project is add";
}

    public List<Cart> getUserCart(String userId) {

        return cartRepository.findByUserId(userId);
    }




    public Product getProduct(String productId){
        return restTemplate.getForObject("http://PRODUCT-SERVICE/products/"+ productId, Product.class);
    }

}
