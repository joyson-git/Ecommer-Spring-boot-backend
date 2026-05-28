package com.Ecommer.controller;


import com.Ecommer.model.Cartegory;
import com.Ecommer.service.CategoryService;
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
    public Cartegory addCategory(@RequestBody Cartegory category) {
        return categoryService.addCategory(category);
    }

    @GetMapping
    public List<Cartegory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Cartegory getById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public Cartegory update(@PathVariable String id, @RequestBody Cartegory category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully";
    }
}