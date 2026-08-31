package com.Ecommer.controller;

import com.Ecommer.dto.Cart;
import com.Ecommer.dto.Payment;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Order;
import com.Ecommer.service.OrderService;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {



//    Validate cart
//    Check inventory
//    Reserve stock
//    Maintain order status
//    Track order


//    POST /orders
//    GET  /orders/{id}
//    GET  /orders/my-orders
//    PUT  /orders/{id}/cancel



    private  final OrderService orderService;

    public  OrderController(OrderService orderService){
        this.orderService= orderService;
    }

   // Creat the lab order
    @PostMapping("/place")
    public String placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }



    // Get all orders for a user
    @GetMapping("/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderService.getUserOrders(userId);
    }



    // Get cart items for a user
    @GetMapping("/cart/{userId}")
   public List<Cart> getCartItem(@PathVariable String userId){
        return orderService.getCartItems(userId);
}



    // Get product
@GetMapping("/product/{id}")
 public Product getProduct(@PathVariable String id){
return orderService.getProduct(id);
 }


 // make the payment
 @GetMapping("/payment/{orderId}/{amount}")
public Payment makePayment(@PathVariable String orderId,@RequestParam Double amount){
     return orderService.makePayment(orderId, amount);
}


    // Cancel order
    @PutMapping("/orders/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable String orderId){
        String response = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(response);
    }

}
