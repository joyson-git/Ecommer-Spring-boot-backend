package com.Ecommer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SearchServiceApp
{
    public static void main( String[] args )
    {
        SpringApplication.run(SearchServiceApp.class,args);
        System.out.println( "SearchService----------------------!" );
    }
}



//Search by product name
//Search by category
//Filter by price
//Sort products
//Pagination