package com.Ecommer.controller;

import com.Ecommer.dto.Product;
import com.Ecommer.model.Cart;
import com.Ecommer.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public  CartController(CartService cartService){
        this.cartService= cartService;
    }

    @PostMapping("/add")
    public  String  AddtoCart(@RequestBody Cart cart){
        return cartService.addToCart(cart);
    }


    @GetMapping("/{userId}")
    public List<Cart> getUserCart(@PathVariable String userId) {
        return cartService.getUserCart(userId);
    }

    @GetMapping("/product/{id}")
    public Product  getProductFromProductService(@PathVariable String id){
        return  cartService.getProduct(id);
    }


}
