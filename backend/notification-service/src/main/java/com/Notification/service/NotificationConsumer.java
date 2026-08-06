package com.Notification.service;

import com.Notification.event.OrderPlacedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private static final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void handleOrderNotification(OrderPlacedEvent event) {
        logger.info("==================================================");
        logger.info("NOTIFICATION RECEIVED for Order #{}", event.getOrderNumber());
        logger.info("Customer Name : {}", event.getCustomerName());
        logger.info("Customer Email: {}", event.getCustomerEmail());
        logger.info("Total Amount  : ${}", event.getTotalAmount());
        logger.info("Sending order confirmation email to {}...", event.getCustomerEmail());
        logger.info("==================================================");
    }
}
