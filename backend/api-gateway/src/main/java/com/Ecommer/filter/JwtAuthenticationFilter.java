package com.Ecommer.filter;

import com.Ecommer.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();

        // 1. Allow Public APIs
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        // 2. Validate Authorization Header
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }

        // 3. Extract and Validate Token
        String token = authHeader.substring(7).trim();
        if (!jwtUtil.validateToken(token)) {
            return unauthorized(exchange);
        }

        // 4. Extract User Role
        String role = jwtUtil.extractRole(token);

        // 5. Role-Based Route Protection
        if (path.startsWith("/products")) {
            if ("GET".equalsIgnoreCase(method)) {
                if (!hasRole(role, "CUSTOMER", "STORE_ADMIN", "ADMIN")) {
                    return forbidden(exchange);
                }
            } else {
                if (!hasRole(role, "STORE_ADMIN", "ADMIN")) {
                    return forbidden(exchange);
                }
            }
        }
        else if (path.startsWith("/categories")) {
            if ("GET".equalsIgnoreCase(method)) {
                if (!hasRole(role, "CUSTOMER", "STORE_ADMIN", "ADMIN")) {
                    return forbidden(exchange);
                }
            } else {
                if (!hasRole(role, "STORE_ADMIN", "ADMIN")) {
                    return forbidden(exchange);
                }
            }
        }
        else if (path.startsWith("/cart") || path.startsWith("/payments")) {
            if (!"CUSTOMER".equals(role)) {
                return forbidden(exchange);
            }
        }
        else if (path.startsWith("/delivery")) {
            if (!hasRole(role, "DELIVERY_PARTNER", "ADMIN")) {
                return forbidden(exchange);
            }
        }
        else if (path.startsWith("/admin")) {
            if (!"SUPER_ADMIN".equals(role)) {
                return forbidden(exchange);
            }
        }

        return chain.filter(exchange);
    }

    // Helper: Check if user role exists in allowed list
    private boolean hasRole(String userRole, String... allowedRoles) {
        if (userRole == null) {
            return false;
        }
        return Arrays.asList(allowedRoles).contains(userRole);
    }

    // Helper: 401 Unauthorized Response
    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    // Helper: 403 Forbidden Response
    private Mono<Void> forbidden(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        return exchange.getResponse().setComplete();
    }
}