package com.web.DemoWebApp.Service;

import com.web.DemoWebApp.Model.Product;
import com.web.DemoWebApp.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo repo;

//    List<Product> products = new ArrayList<>(Arrays.asList(new Product(101,"Iphone",50000),
//            new Product(102,"Camera",150000),
//            new Product(103,"spects",5000)));

    public List<Product> getAllProducts(){
//        return products;
        return repo.findAll();
    }

    public Product getProductByID(int prodId){
//        return products.stream()
//                .filter(p->p.getProductId()==prodId)
//                .findFirst().orElse(new Product(0,"No Item",0));
        return repo.findById(prodId).orElse(new Product());
    }

    public void addProduct(Product p){
//        products.add(p);
        repo.save(p);
    }

    public void updateProduct(Product prod){
//        int index=0;
//        for(int i=0;i<products.size();i++){
//            if(products.get(i).getProductId() == prod.getProductId()){
//                System.out.println(prod.getProductId());
//                index=i;
//            }
//        }
//        products.set(index,prod);
        repo.save(prod);
    }

    public void deleteProduct(int prodId){
//        int index=0;
//        for(int i=0;i<products.size();i++){
//            if(products.get(i).getProductId() == prodId){
//                index=i;
//            }
//        }
//        products.remove(index);
        repo.deleteById(prodId);
    }
}
