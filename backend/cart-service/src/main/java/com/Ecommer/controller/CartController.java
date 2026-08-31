package com.Ecommer.controller;

import com.Ecommer.dto.CartItemResponse;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Cart;
import com.Ecommer.service.CartService;



import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;



//    PUT    /cart/items/{productId}

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    //   Add the item
    @PostMapping("/add")
    public String AddtoCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }


    //  get all product in the cart
    @GetMapping("/{userId}")
    public List<CartItemResponse> getUserCart(@PathVariable String userId){
        return cartService.getFullCartDetails(userId);
    }

    @PutMapping("/items/{productId}")
     public String update(@PathVariable String productId, @RequestBody Cart cart){
        return cartService.updateCartItem(productId,cart);
    }



//    @GetMapping("/product/{id}")
//    public Product getProductFromProductService(@PathVariable String id) {
//        return cartService.getProduct(id);
//    }


    //Deleting one product
    @DeleteMapping("/{id}")
    public String removeProductFromCart(@PathVariable String id) {
        return cartService.deleteProduct(id);
    }

 // Deleting entire cart
    @DeleteMapping("/remove/{userId}")
    public String deleteCart(@PathVariable String userId){
        return cartService.deleteAllProduct(userId);
    }




}

