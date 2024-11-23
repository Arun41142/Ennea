package com.project.Ecom_project.Controller;

import com.project.Ecom_project.Model.Product;
import com.project.Ecom_project.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<?> addProduct(
            @RequestPart("prod") Product prod,
            @RequestPart("imageFile") MultipartFile imageFile) {

        try {
            Product product = service.addProduct(prod, imageFile);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id ,@RequestPart("prod") Product prod,
                                                @RequestPart("imageFile") MultipartFile imageFile ) throws IOException {
        Product product = service.updateProduct(id,prod,imageFile);
        if(product != null){
            return new ResponseEntity<>("updated Product Successfully" ,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Failed to Update Product",HttpStatus.BAD_REQUEST);
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

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = service.searchProducts(keyword);
        if (!products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}


