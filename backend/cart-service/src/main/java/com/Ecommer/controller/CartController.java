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


//    GET    /cart
//    POST   /cart/items
//    PUT    /cart/items/{productId}
//    DELETE /cart/items/{productId}
//    DELETE /cart


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    //    POST   /cart/items
    @PostMapping("/add")
    public String AddtoCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }


    //  GET  /cart  @GetMapping("/{userId}")
    @GetMapping("/{userId}")
    public List<CartItemResponse> getUserCart(@PathVariable String userId){
        return cartService.getFullCartDetails(userId);
    }



    @GetMapping("/product/{id}")
    public Product getProductFromProductService(@PathVariable String id) {
        return cartService.getProduct(id);
    }

    //    DELETE /cart
    @DeleteMapping("/{id}")
    public String removeProductFromCart(@PathVariable String id) {
        return cartService.deleteProduct(id);
    }


}

