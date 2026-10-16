# 03 — Microservices Design

Each service below is a separate Spring Boot application under `backend/`. Paths are the gateway paths. Add the gateway host `http://localhost:9002` in front of them.

## 1. Auth — port 9001 — `auth_db`

| Method | Path | Behavior |
| --- | --- | --- |
| POST | `/auth/signup` | Rejects a duplicate email, hashes the password, forces role `CUSTOMER`. |
| POST | `/auth/login` | Returns a JWT string, or the text `Invalid email or password`. |

Login does not use a different HTTP status for failure. Both outcomes are a 200 response with a string body.

## 2. Product — port 9007 — `product_db`

| Method | Path | Who |
| --- | --- | --- |
| GET | `/products` | Customer, store admin, admin |
| GET | `/products/{id}` | Customer, store admin, admin |
| GET | `/products/category/{categoryId}` | Customer, store admin, admin |
| GET | `/products/search?keyword=` | Customer, store admin, admin |
| POST | `/products` | Store admin, admin |
| PUT | `/products/{id}` | Store admin, admin |
| DELETE | `/products/{id}` | Store admin, admin |

A missing status on create becomes `ACTIVE`. Search uses `findByNameContaining`.

## 3. Category — port 9004 — `category_db`

| Method | Path | Who |
| --- | --- | --- |
| GET | `/categories` and `/categories/{id}` | Customer, store admin, admin |
| POST, PUT, DELETE | `/categories` | Store admin, admin |

The category type is `Category`. The gateway path is `/categories`.

## 4. Search — port 9008 — no database

| Method | Path |
| --- | --- |
| GET | `/search/{keyword}` |

Search calls product `GET /products/search?keyword=`. On failure it returns an empty list.

## 5. Cart — port 9003 — `cart_db`

| Method | Path | Behavior |
| --- | --- | --- |
| POST | `/cart/add` | Saves the body. Does not check that the product exists. |
| GET | `/cart/{userId}` | Loads cart rows and fills name, price, and image from the product service. |
| PUT | `/cart/items/{productId}` | Updates quantity on the first row with that product id, any user. |
| DELETE | `/cart/{id}` | Deletes one cart document by id. |
| DELETE | `/cart/remove/{userId}` | Deletes every row for that user. |

Gateway rule: only `CUSTOMER`.

## 6. Order — port 9009 — `order_db`

| Method | Path | Behavior |
| --- | --- | --- |
| POST | `/orders/place` | Saves the order with status `Placed`. |
| GET | `/orders/{userId}` | Lists orders for that user id. |
| GET | `/orders/cart/{userId}` | Proxies the cart service. |
| GET | `/orders/product/{id}` | Proxies the product service. |
| GET | `/orders/payment/{orderId}/{amount}` | Posts a payment. `amount` is a query parameter. |
| PUT | `/orders/orders/{orderId}/cancel` | Sets status `Cancel` when the id exists. |

An order document holds `userId`, `productId`, `quantity`, `totalPrice`, `status`, `customerEmail`, and `customerName`. The client chooses the price.

## 7. Payment — port 9006 — `payment_db`

| Method | Path | Behavior |
| --- | --- | --- |
| POST | `/payments` | Saves the payment with status `Sucess`. |
| GET | `/payments/{orderId}` | Loads the row or throws if missing. |
| POST | `/payments/{id}/verify` | Same lookup. Does not call a bank. |
| POST | `/payments/{id}/refund` | Requires status `SUCCESS`, which is never stored. |

Gateway rule: only `CUSTOMER`. There is no Razorpay order, signature check, or test-card flow.

## 8. Inventory — port 9010 — not on the gateway

| Method | Path | Behavior |
| --- | --- | --- |
| GET | `/inventory/store/{storeId}` | All rows for a store. |
| GET | `/inventory/quantity?storeId&productId` | Physical quantity, or 0. |
| POST | `/inventory/reserve?storeId&productId&amount` | Moves available stock into reserve. |
| POST | `/inventory/release?storeId&productId&amount` | Releases reserved units. |
| PUT | `/inventory/update-stock?storeId&productId&newQuantity` | Sets the physical quantity. |

Low-stock, availability, and the rule-based restock text exist in `InventoryService`. Their controller methods are commented out. Order placement never calls reserve.

## 9. Delivery — port 9011 — `delivery_db`

| Method | Path |
| --- | --- |
| POST | `/delivery` |
| GET | `/delivery` and `/delivery?status=` |
| GET | `/delivery/{id}` |
| GET | `/delivery/order/{orderId}` |
| GET | `/delivery/user/{userId}` |
| GET | `/delivery/partner/{partnerId}` |
| PUT | `/delivery/{id}/assign` |
| PUT | `/delivery/{id}/status` |
| PUT | `/delivery/{id}/cancel` |
| DELETE | `/delivery/{id}` |

Statuses: `PENDING`, `ASSIGNED`, `PICKED_UP`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`, `FAILED`. A missing tracking number becomes `TRK-` plus eight characters. Gateway rule: `DELIVERY_PARTNER` or `ADMIN`. Nothing creates a delivery when an order is placed.

## 10. Notification — port 9005

Listens to Kafka topic `notification-topic`. On a message it logs the order number, customer name, email, and amount. It does not send email or SMS. No producer is active.
