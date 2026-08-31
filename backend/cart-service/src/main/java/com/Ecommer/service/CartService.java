package com.Ecommer.service;

import com.Ecommer.dto.CartItemResponse;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Cart;
import com.Ecommer.repositary.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private CartRepository cartRepository;
    private RestTemplate restTemplate;


    public  CartService(CartRepository cartRepository,RestTemplate restTemplate){
        this.cartRepository = cartRepository;
        this.restTemplate = restTemplate;
    }

    public  String addToCart(Cart cart){
        cartRepository.save(cart);
        System.out.print(cart +"  ");
        return " the project is add";
}


    public List<Cart> getUserCart(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public Product getProduct(String productId){
        return restTemplate.getForObject("http://PRODUCT-SERVICE/products/"+ productId, Product.class);
    }

    public String deleteProduct(String id) {
        cartRepository.deleteById(id);
        return "Item successfully removed from cart!";
    }

    public List<CartItemResponse> getFullCartDetails(String userId) {

        // 1. Get raw items from MongoDB
        List<Cart> rawCartItems = cartRepository.findByUserId(userId);

        // Create an empty list to hold our packaged boxes
        List<CartItemResponse> finalResponse = new ArrayList<>();

        // 2. Loop through every item in the cart
        for (Cart item : rawCartItems) {

            // 3. Call your Product Service
            Product productDetails = getProduct(item.getProductId());

            // 4. Create the new DTO and pack it
            CartItemResponse dto = new CartItemResponse();

            // Add the Cart database data
            dto.setCartItemId(item.getId());
            dto.setQuantity(item.getQuantity());
            if (productDetails != null) {
                dto.setProductId(productDetails.getId());
                dto.setProductName(productDetails.getName());
                dto.setPrice(productDetails.getPrice());
                dto.setImageUrl(productDetails.getImageUrl()); // 📸 Safely caught!
            }
            finalResponse.add(dto);
        }

        // 6. Send the list of packages back to the Controller
        return finalResponse;
    }


    public String deleteAllProduct(String userId){
        List<Cart>  cartItems = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(cartItems);
        return "Cart delete successfull";
    }

public String updateCartItem(String productId ,Cart cart){
        List<Cart> cartItem = cartRepository.findByProductId(productId);

        if(cartItem.isEmpty()){
            return "Product no item found";
        }
        Cart item = cartItem.get(0);
        item.setQuantity(cart.getQuantity());
        cartRepository.save(item);
        return "Cart item updated successfully";
}





}