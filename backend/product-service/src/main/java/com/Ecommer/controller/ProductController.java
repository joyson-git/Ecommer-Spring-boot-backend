package com.Ecommer.controller;

import com.Ecommer.models.Product;
import com.Ecommer.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


   // POST  Create the product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    //    GET    view the product
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    //GET  view the product by id
    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return productService.getProductById(id);
    }


    //GET   Product categories
    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(@PathVariable String categoryId) {
        return productService.getByCategory(categoryId);
    }

    //Product search
    @GetMapping("/search")
    public List<Product> search(@RequestParam("keyword") String name) {
        return productService.searchByName(name);
    }


    //PUT    Update produc
    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }


    //Delete product
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }


//Product availability information

}