package com.Ecommer.controller;

import com.Ecommer.dto.CartItemResponse;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Cart;
import com.Ecommer.service.CartService;

// These two imports must match!
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;


    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public String AddtoCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }


//    @GetMapping("/{userId}")
//    public List<CartIt> getUserCart(@PathVariable String userId) {
//
//
//        return cartService.getUserCart(userId);
//    }

    @GetMapping("/{userId}")
    public List<CartItemResponse> getUserCart(@PathVariable String userId){
        logger.info("Fetching FULL cart details (with images via DTO) for userId: {}", userId);
        return cartService.getFullCartDetails(userId);
    }



    @GetMapping("/product/{id}")
    public Product getProductFromProductService(@PathVariable String id) {
        return cartService.getProduct(id);
    }

    @DeleteMapping("/{id}")
    public String removeProductFromCart(@PathVariable String id) {
        return cartService.deleteProduct(id);
    }


}

