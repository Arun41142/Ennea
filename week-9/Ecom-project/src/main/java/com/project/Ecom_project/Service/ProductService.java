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

    public Product addProduct(Product prod, MultipartFile imageFile) throws IOException {
         prod.setImageName(imageFile.getOriginalFilename());
         prod.setImageType(imageFile.getContentType());
         prod.setImageData(imageFile.getBytes());
         return repo.save(prod);
    }

    public Product updateProduct(int id, Product updatedProduct, MultipartFile imageFile) throws IOException {
        Product existingProduct = repo.findById(id).orElse(null);

        if (existingProduct == null) {
            return null;
        }

        // Update product fields
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setReleaseDate(updatedProduct.getReleaseDate());
        existingProduct.setProductAvailable(updatedProduct.isProductAvailable());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());

        if (imageFile != null && !imageFile.isEmpty()) {
            existingProduct.setImageData(imageFile.getBytes());
        }

        return repo.save(existingProduct);
    }

    public boolean deleteProduct(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Product> searchProducts(String keyword) {
        return repo.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }


}
