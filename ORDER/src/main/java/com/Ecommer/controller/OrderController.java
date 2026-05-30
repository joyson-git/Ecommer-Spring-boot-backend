package com.Ecommer.controller;

import com.Ecommer.dto.Cart;
import com.Ecommer.dto.Payment;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Order;
import com.Ecommer.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private  final OrderService orderService;

    public  OrderController(OrderService orderService){
        this.orderService= orderService;
    }

    @PostMapping("/place")
    public String placeOrder(@RequestBody Order order) {

        return orderService.placeOrder(order);
    }

    @GetMapping("/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderService.getUserOrders(userId);
    }

    @GetMapping("/cart/{userId}")
public List<Cart> getCartItem(@PathVariable String userId){
        return orderService.getCartItems(userId);
}


@GetMapping("/product/{id}")
 public Product getProduct(@PathVariable String id){
return orderService.getProduct(id);
 }

 @GetMapping("/payment/{orderId}/{amount}")
public Payment makePayment(@PathVariable String orderId,@PathVariable Double amount){
     return orderService.makePayment(orderId, amount);
}


}
