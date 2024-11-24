package com.project.Ecom_project.Controller;

import com.project.Ecom_project.Model.Product;
import com.project.Ecom_project.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/Api")
@CrossOrigin
public class ProductController {

    @Autowired // By this the object to a particular class can be created by the spring boot itself without using the new keyword
    private ProductService service;

    @RequestMapping("/")
    public String Greet(){
        return "Hello welcome to my webpage";
    }

    @GetMapping("products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getElementbyId(@PathVariable int id){
        Product prod=service.getElementById(id);
        if(prod!=null){
            return new ResponseEntity<>(service.getElementById(id),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product prod) {

        try {
            Product product = service.addProduct(prod);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        Product existingProduct = service.getElementById(id);
        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setReleaseDate(updatedProduct.getReleaseDate());
            existingProduct.setProductAvailable(updatedProduct.isProductAvailable());
            existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
            existingProduct.setImageUrl(updatedProduct.getImageUrl());

            service.updateProduct(existingProduct);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        boolean isDeleted = service.deleteProduct(id);
        if (isDeleted) {
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to delete product", HttpStatus.NOT_FOUND);
        }
    }


}


