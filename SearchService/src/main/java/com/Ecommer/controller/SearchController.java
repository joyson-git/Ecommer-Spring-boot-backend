package com.Ecommer.controller;


import com.Ecommer.dto.Product;
import com.Ecommer.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

@GetMapping("/{keyword}")
public List<Product> searchProduct(@PathVariable String keyword){
    return searchService.searchByName(keyword);
}


}
