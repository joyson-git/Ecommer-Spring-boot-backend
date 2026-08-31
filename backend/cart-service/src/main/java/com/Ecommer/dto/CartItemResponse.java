package com.Ecommer.dto;



public class CartItemResponse {

    // Data from the Cart Database
    private String cartItemId;
    private Integer quantity;

    // Data from the Product Service
    private String productId;
    private String productName;
    private Double price;
    private String imageUrl;

    // --- Getters and Setters ---
    public String getCartItemId() { return cartItemId; }
    public void setCartItemId(String cartItemId) { this.cartItemId = cartItemId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

}