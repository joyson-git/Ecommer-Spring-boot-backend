package com.Ecommer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CartegoryApp {
    public static void main( String[] args ) {
        SpringApplication.run(CartegoryApp.class,args);
        System.out.println( "CartegoryApp-- running" );
    }
}
