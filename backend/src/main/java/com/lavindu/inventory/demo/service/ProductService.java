package com.lavindu.inventory.demo.service;

import com.lavindu.inventory.demo.model.Product;
import com.lavindu.inventory.demo.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    public Product addProducts(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return productRepo.save(product);
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product updateProduct(Long id, Product updatedData, MultipartFile imageFile) throws IOException {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new IOException("Product not found"));

        // Update fields
        product.setName(updatedData.getName());
        product.setPrice(updatedData.getPrice());
        product.setQuantity(updatedData.getQuantity());
        product.setDescription(updatedData.getDescription());
        product.setCategory(updatedData.getCategory());
        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }

        return productRepo.save(product);
    }

    public boolean deleteProduct(Long id) {
        Optional<Product> productOpt = productRepo.findById(id);
        if (productOpt.isPresent()) {
            productRepo.delete(productOpt.get());
            return true;
        }
        return false;
    }

    public List<Product> searchProduct(String keyword) {
        return productRepo.searchProducts(keyword);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.getProductsByCategory(category);
    }
}
