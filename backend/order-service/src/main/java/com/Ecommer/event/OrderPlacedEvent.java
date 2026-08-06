package com.Ecommer.event;

import java.math.BigDecimal;

public class OrderPlacedEvent {
    private String orderNumber;
    private String customerEmail;
    private String customerName;
    private BigDecimal totalAmount;


    public OrderPlacedEvent() {
    }

    public  OrderPlacedEvent(String orderNumber, String customerEmail,String customerName,BigDecimal totalAmount){
        this.orderNumber=orderNumber;
        this.customerEmail=customerEmail;
        this.customerName=customerName;
        this.totalAmount = totalAmount;
    }

    public String getOrderNumber(){
        return  orderNumber;
    }
    public void setOrderNumber(String orderNumber){
        this.orderNumber=orderNumber;
    }

    public String getCustomerEmail(){
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail){
        this.customerEmail = customerEmail;
    }

    public String getCustomerName(){
        return customerName;
    }

    public  void  setCustomerName(String customerName){
        this.customerName = customerName;
    }

    public BigDecimal getTotalAmount(){
        return  totalAmount;
    }

    public  void setTotalAmount(BigDecimal totalAmount){
        this.totalAmount= totalAmount;
    }
}
