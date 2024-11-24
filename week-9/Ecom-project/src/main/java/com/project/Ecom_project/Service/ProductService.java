package com.project.Ecom_project.Service;

import com.project.Ecom_project.Model.Product;
import com.project.Ecom_project.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getElementById(int id){
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product prod) {
         return repo.save(prod);
    }

    public void updateProduct(Product prod){
        repo.save(prod);
    }

    public boolean deleteProduct(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

}
