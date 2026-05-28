package com.Ecommer.controller;

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
}
