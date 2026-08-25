package com.Ecommer.service;

import com.Ecommer.entity.ProductStatus;
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

    //addProduct
    public Product addProduct(Product product) {

        // If status is not provided, make the product ACTIVE
        if (product.getStatus() == null) {
            product.setStatus(com.Ecommer.entity.ProductStatus.ACTIVE);
        }

        return productRepository.save(product);
    }


    //viewaAllproduct
public List<Product> getAllProducts()
{
        return productRepository.findAll();
}

//getall the product
    public Product getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }


    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    //Product search
    public List<Product> searchByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    //updata
    public Product updateProduct(String id, Product newProduct) {
        Optional<Product> existing = productRepository.findById(id);

        if (existing.isPresent()) {
            Product p = existing.get();
            p.setName(newProduct.getName());
            p.setDescription(newProduct.getDescription());
            p.setCategory(newProduct.getCategory());
            p.setBrand(newProduct.getBrand());
            p.setPrice(newProduct.getPrice());
            p.setImage(newProduct.getImage());
            p.setUnit(newProduct.getUnit());
            p.setStatus(newProduct.getStatus());

            return productRepository.save(p);
        }

        return null;
    }
//delete
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }


}
