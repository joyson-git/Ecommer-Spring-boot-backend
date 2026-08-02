package com.Ecommer.service;

import com.Ecommer.models.Product;
import com.Ecommer.repositary.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

private final ProductRepository productRepository;


    public  ProductService(ProductRepository productRepository){
        this.productRepository= productRepository;
    }

    public Product addProduct(Product product){
        System.out.print("the request is hitting the  service product");

        return productRepository.save(product);
}

public List<Product> getAllProducts(){
        return productRepository.findAll();
}

    public Product getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }
    public List<Product> getByCategory(String categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    public Product updateProduct(String id, Product newProduct) {
        Optional<Product> existing = productRepository.findById(id);

        if (existing.isPresent()) {
            Product p = existing.get();
            p.setName(newProduct.getName());
            p.setDescription(newProduct.getDescription());
            p.setPrice(newProduct.getPrice());
            p.setCategoryId(newProduct.getCategoryId());
            p.setStock(newProduct.getStock());

            return productRepository.save(p);
        }

        return null;
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }


}
