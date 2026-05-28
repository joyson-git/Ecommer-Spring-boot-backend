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

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(@PathVariable String categoryId) {
        return productService.getByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String name) {
        return productService.searchByName(name);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}