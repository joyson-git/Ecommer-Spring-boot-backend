package com.Ecommer.dto;



public class Product {

    private  String id;
    private String name;
    private String description;
    private double price;
    private String categoryId;
    private Integer stock;


    public Product(){
    }

   public Product(String id, String name,double price,String description, Integer stock,String categoryId){
        this.id=id;
        this.name=name;
        this.price=price;
        this.description= description;
        this.stock=stock;
        this.categoryId=categoryId;
   }

public String getId(){
        return id;
}

public void setId(String id){
        this.id=id;
}

public String getDescription(){
        return description;
}

public void setDescription(String description){
        this.description= description;
}

public Integer getStock(){
    return stock;
}

public void setStock(Integer stock){
        this.stock=stock;
}




public  String getCategoryId(){
        return categoryId;
}

public void setCategoryId(String categoryId){
        this.categoryId=categoryId;
}




   public String getName(){
        return name;
   }

   public void setName(String name){
        this.name= name;
   }

   public  double getPrice(){
        return price;
   }
   
public  void setPrice(double price){
       this.price= price;
}
}
