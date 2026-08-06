package com.Ecommer.service;


import com.Ecommer.model.Cartegory; // Added the correct import here!
import com.Ecommer.repositary.CartegoryRepositary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CartegoryRepositary categoryRepository;

    public CategoryService(CartegoryRepositary categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Now it uses YOUR Cartegory model!
    public Cartegory addCategory(Cartegory category) {
        return categoryRepository.save(category);
    }

    public List<Cartegory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Cartegory getCategoryById(String id) {
        Optional<Cartegory> category = categoryRepository.findById(id);
        return category.orElse(null);
    }

    public Cartegory updateCategory(String id, Cartegory newCategory) {
        Optional<Cartegory> existing = categoryRepository.findById(id);

        if (existing.isPresent()) {
            Cartegory cat = existing.get();
            cat.setName(newCategory.getName());
            cat.setDescription(newCategory.getDescription());
            return categoryRepository.save(cat);
        }

        return null;
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }
}