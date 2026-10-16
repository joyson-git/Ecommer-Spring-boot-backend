package com.ecommer.service;


import com.ecommer.model.Category; // Added the correct import here!
import com.ecommer.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Now it uses YOUR Category model!
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }

    public Category updateCategory(String id, Category newCategory) {
        Optional<Category> existing = categoryRepository.findById(id);

        if (existing.isPresent()) {
            Category cat = existing.get();
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