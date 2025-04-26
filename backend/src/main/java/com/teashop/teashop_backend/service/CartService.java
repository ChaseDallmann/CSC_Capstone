package com.teashop.teashop_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teashop.teashop_backend.model.cart.Cart;
import com.teashop.teashop_backend.model.cart.CartRepository;
import com.teashop.teashop_backend.model.product.Product;
import com.teashop.teashop_backend.model.product.ProductRepository;
import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Cart> getCartItems(int userId) {
        // Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Get cart items for this user
            return cartRepository.findByUser(user);
        }
        // Return empty list if user not found
        return List.of();
    }

    public double getTotalPrice(int userID) {
        // Logic to calculate the total price of items in the cart for the given userID
        return getCartItems(userID).stream()
            .mapToDouble(cart -> cart.getProduct().getPrice() * cart.getQuantity())
            .sum();
    }

    
    @Transactional
    public Cart addToCart(int userId, int productId, int quantity) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Check if there's enough inventory
        if (product.getProductInventory() < quantity) {
            throw new RuntimeException("Not enough inventory available");
        }
            
        // Check if this product is already in user's cart
        Optional<Cart> existingCartItem = cartRepository.findByUserAndProduct(user, product);
        
        // Reduce inventory
        product.setProductInventory(product.getProductInventory() - quantity);
        productRepository.save(product);
        
        if (existingCartItem.isPresent()) {
            // Update quantity of existing cart item
            Cart cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartRepository.save(cartItem);
        } else {
            // Create new cart item
            Cart newCartItem = new Cart(user, product, quantity);
            return cartRepository.save(newCartItem);
        }
    }
    
    //Adding a transactional annotation to ensure that all methods are executed or rolledback
    @Transactional
    public void removeFromCart(int cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            Product product = cart.getProduct();
            int quantity = cart.getQuantity();
            
            // Return items to inventory
            product.setProductInventory(product.getProductInventory() + quantity);
            productRepository.save(product);
            
            // Delete cart item
            cartRepository.deleteById(cartId);
        }
    }
    
    //Adding a transactional annotation to ensure that all methods are executed or rolledback
    @Transactional
    public Cart updateQuantity(int cartId, int newQuantity) {
        //Finding the correct cart for the user
        Cart cart = cartRepository.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        //Getting the product info from the cart
        Product product = cart.getProduct();
        //Gettings Quantity before we subtract or add
        int oldQuantity = cart.getQuantity();
        //Getting back a positive or negative int depending on the difference
        int quantityDifference = newQuantity - oldQuantity;
        
        //If we get a positive number, we are adding to the cart
        if (quantityDifference > 0) {
            // Adding more items to cart
            if (product.getProductInventory() < quantityDifference) {
                throw new RuntimeException("Not enough inventory available");
            }
            // Reduce inventory
            product.setProductInventory(product.getProductInventory() - quantityDifference);
        // If we get a negative number, we are removing from the cart
        } else if (quantityDifference < 0) {
            // Removing items from cart
            // Return items to inventory
            product.setProductInventory(product.getProductInventory() - quantityDifference);
        }
        
        // Save product with updated inventory
        productRepository.save(product);
        
        // Update cart quantity
        cart.setQuantity(newQuantity);
        return cartRepository.save(cart);
    }
}