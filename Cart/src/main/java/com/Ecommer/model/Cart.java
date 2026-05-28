package com.Ecommer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cart")
public class Cart {

    @Id
    private String id;

    private String userId;
   private String productId;
   private  Integer quantity;

   public  Cart(){

   }
   public Cart(String id,String userId, String productId, Integer quantity){
       this.id = id;
       this.userId = userId;
       this.productId = productId;
       this.quantity = quantity;
   }

 public String setId(){
       return id;
 }

 public void getId(String id){
       this.id= id;
 }

    public String setuserId(){
        return id;
    }

    public void getuserId(String userId){
        this.userId = userId;
    }

    public  String getProductId(){
       return productId;
    }

    public void  getProductId(String ProductId){
       this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
