package com.ecommer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CategoryApp {
    public static void main( String[] args ) {
        SpringApplication.run(CategoryApp.class,args);
        System.out.println( "CategoryApp-- running" );
    }
}
