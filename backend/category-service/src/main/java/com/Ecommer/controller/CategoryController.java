package com.ecommer.controller;


import com.ecommer.model.Category;
import com.ecommer.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable String id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully";
    }
}