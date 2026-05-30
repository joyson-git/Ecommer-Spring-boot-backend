package com.Ecommer.dto;

public class Payment {

    private  String id;
    private String orderId;
    private Double amount;
    private String status;

    public  Payment(){}

    public Payment(String id, String orderId,Double amount,String status){
        this.id=id;
        this.orderId=orderId;
        this.amount= amount;
        this.status=status;
    }

    public String getId(){
        return  id;
    }

    public void setId(String id){
        this.id=id;
    }

    public String getOrderId(){
        return orderId;
    }
    public  void setOrderId(String OrderId){
        this.orderId=orderId;
    }

public Double getAmount(){
        return  amount;
}

public  void  setAmount(Double amount){
        this.amount =amount;
}


public  String getStatus(){
        return status;
}

public  void setStatus(String status){
        this.status = status;
}

}
