package com.Ecommer.service;



import com.Ecommer.model.Order;
import com.Ecommer.repositary.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

  private final OrderRepository orderRepository;

public OrderService(OrderRepository orderRepository){
    this.orderRepository = orderRepository;
}

public String placeOrder(Order order){

    order.setStatus("Placed");
    orderRepository.save(order);
    return "Order Placed Successfully";
}
    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }

}

