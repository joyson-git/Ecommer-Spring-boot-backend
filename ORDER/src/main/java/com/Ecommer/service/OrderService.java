package com.Ecommer.service;



import com.Ecommer.dto.Cart;
import com.Ecommer.dto.Payment;
import com.Ecommer.dto.Product;
import com.Ecommer.model.Order;
import com.Ecommer.repositary.OrderRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OrderService {

    private RestTemplate restTemplate;
    private final OrderRepository orderRepository;

public OrderService(OrderRepository orderRepository,RestTemplate restTemplate){
    this.orderRepository = orderRepository;
    this.restTemplate = restTemplate;
}

public String placeOrder(Order order){

    order.setStatus("Placed");
    orderRepository.save(order);
    return "Order Placed Successfully";
}
    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }



    public List<Cart> getCartItems(String userId) {

        ResponseEntity<List<Cart>> response =
                restTemplate.exchange(
                        "http://CART-SERVICE/cart/" + userId,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Cart>>() {}
                );

        return response.getBody();
    }
     public Product getProduct(String productId){

    return restTemplate.getForObject("http://PRODUCT-SERVICE/products/"+productId,Product.class);
     }

    public Payment makePayment(String orderId, Double amount) {

        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setAmount(amount);

        return restTemplate.postForObject(
                "http://PAYMENT-SERVICE/payments",
                payment,
                Payment.class
        );
    }



}

