# Ecommer-Spring-boot-backend

Current service communication
SEARCH-SERVICE  ---> PRODUCT-SERVICE

CART-SERVICE    ---> PRODUCT-SERVICE

ORDER-SERVICE   ---> CART-SERVICE

ORDER-SERVICE   ---> PRODUCT-SERVICE

ORDER-SERVICE   ---> PAYMENT-SERVICE


Current architecture

API-GATEWAY
      |
      v
AUTH-SERVICE
PRODUCT-SERVICE
CATEGORY-SERVICE
SEARCH-SERVICE
CART-SERVICE
ORDER-SERVICE
PAYMENT-SERVICE
      |
      v
EUREKA-SERVER


ROLE_ADMIN

Can:

✅ Add products
✅ Update products
✅ Delete products
✅ Add categories
✅ View all orders
✅ Manage inventory
✅ Manage users (optional)

ROLE_CUSTOMER

Can:

✅ Register
✅ Login
✅ Search products
✅ Add to cart
✅ Place orders
✅ Make payments
✅ View their own orders




