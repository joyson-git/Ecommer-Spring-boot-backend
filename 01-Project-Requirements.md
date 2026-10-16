# 01 — Project Requirements

Mach is a learning e-commerce backend. It is a set of Spring Boot services behind one API gateway. Customers can sign up, browse products, keep a cart, and save an order. Store staff can manage products and categories. Delivery partners can update deliveries.

This document describes what the code does today. It also lists the checkout gaps that are still open.

## 1. Stack

| Item | Value in this repo |
| --- | --- |
| Language | Java 17 (`pom.xml`) |
| Framework | Spring Boot 3.2.5, Spring Cloud 2023.0.1 |
| Service discovery | Netflix Eureka on port 8761 |
| Edge | Spring Cloud Gateway on port 9002 |
| Database | MongoDB on `localhost:27018` |
| Messaging | Apache Kafka on port 9092, ZooKeeper on port 2181 |
| Auth | BCrypt passwords and JWT (HS256, 1 hour) |
| Service calls | Load-balanced `RestTemplate` through Eureka |

Redis, OpenFeign, a trained demand model, and an OCI deployment are not part of the running backend.

## 2. User roles

Roles stored by auth (`Role` enum):

| Role | What the gateway allows |
| --- | --- |
| `CUSTOMER` | Read products and categories. Use cart and payments. |
| `STORE_ADMIN` | Read and change products and categories. |
| `ADMIN` | Same product and category access as a store admin. Delivery routes. |
| `DELIVERY_PARTNER` | `/delivery/**` only, together with `ADMIN`. |

Signup always saves `CUSTOMER`. The gateway also mentions `SUPER_ADMIN` for `/admin/**`, but no service exposes that path and the enum does not define that role.

## 3. Services

| Service | Port | Gateway prefix | Database |
| --- | --- | --- | --- |
| Eureka | 8761 | none | none |
| API Gateway | 9002 | all public traffic | none |
| Auth | 9001 | `/auth/**` | `auth_db` |
| Cart | 9003 | `/cart/**` | `cart_db` |
| Category | 9004 | `/categories/**` | `category_db` |
| Notification | 9005 | none (Kafka consumer) | none |
| Payment | 9006 | `/payments/**` | `payment_db` |
| Product | 9007 | `/products/**` | `product_db` |
| Search | 9008 | `/search/**` | none (calls product service) |
| Order | 9009 | `/orders/**` | `order_db` |
| Inventory | 9010 | none (not routed) | inventory Mongo database |
| Delivery | 9011 | `/delivery/**` | `delivery_db` |

Inventory is not in `docker-compose.yml` and has no gateway route. Call it on port 9010 directly.

## 4. Customer flow that works

1. `POST /auth/signup` and `POST /auth/login`. Login returns a JWT when the password matches.
2. `GET /products` and `GET /categories` with that token.
3. `GET /search/{keyword}` asks the product service for a name match.
4. `POST /cart/add` stores a cart row. `GET /cart/{userId}` joins each row with the product service.

## 5. Checkout flow that is incomplete

`POST /orders/place` saves the body the client sends and sets status `Placed`. It does not:

- load that user's cart
- price the line from the product service
- reserve stock in inventory
- create a real payment
- publish `OrderPlacedEvent`

Payment `POST /payments` always stores status `Sucess`. Refund accepts only `SUCCESS`, so a refund always fails. The Kafka send in the order service is commented out, so the notification listener never runs.

## 6. Open defects

- Cancel is mapped as `PUT /orders/orders/{orderId}/cancel` because the controller is already under `/orders`.
- `GET /orders/payment/{orderId}/{amount}` reads `amount` as a query parameter, so the path value is ignored.
- Cart update finds the first cart row for a product id across all users.
- The JWT secret is hardcoded in auth and the gateway. A call to a service port skips the gateway check.
- The gateway rate limit is 10 requests per minute for every user together.
- Order Kafka settings sit under `spring.data.kafka` instead of `spring.kafka`.
