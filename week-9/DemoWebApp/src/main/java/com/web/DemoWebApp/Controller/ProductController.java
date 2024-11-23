package com.web.DemoWebApp.Controller;

import com.web.DemoWebApp.Model.Product;
import com.web.DemoWebApp.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class ProductController {
    @Autowired
    ProductService service;
    @GetMapping("/products")
    public List<Product> getProducts(){
        return service.getAllProducts();
    }

    @GetMapping("/products/{prodId}")
    public Product getProductById(@PathVariable int prodId){
        return service.getProductByID(prodId);
    }

    @PostMapping ("/products")
   public void addProduct( @RequestBody Product p){
        System.out.println(p);
        service.addProduct(p);
   }

   @PutMapping("/products")
    public void updateProduct(@RequestBody Product prod){
        service.updateProduct(prod);
   }

   @DeleteMapping("/products/{prodId}")
    public void deleteProduct(@PathVariable int prodId){
        service.deleteProduct(prodId);
   }

}
