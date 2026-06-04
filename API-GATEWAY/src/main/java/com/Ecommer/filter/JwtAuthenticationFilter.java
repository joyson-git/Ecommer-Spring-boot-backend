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

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        System.out.println("Path = " + path);

        // Public APIs
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        // Get Authorization Header
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        System.out.println("Auth Header = " + authHeader);

        // Check Header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // Extract Token
        String token = authHeader.substring(7);
        System.out.println("Token " + token);

        boolean valid = jwtUtil.validateToken(token);
        System.out.println("Valid Token = " + valid);

        // Validate Token
        if (!valid) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // Extract Role
        String role = jwtUtil.extractRole(token);
        System.out.println("Role = " + role);

        // ADMIN only APIs
        if ((path.startsWith("/products") || path.startsWith("/categories"))
                && !"ADMIN".equals(role)) { // <-- FLIPPED HERE to prevent NullPointerException

            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }

        // CUSTOMER only APIs
        if ((path.startsWith("/cart") || path.startsWith("/orders") || path.startsWith("/payments"))
                && !"CUSTOMER".equals(role)) { // <-- FLIPPED HERE to prevent NullPointerException

            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }
}