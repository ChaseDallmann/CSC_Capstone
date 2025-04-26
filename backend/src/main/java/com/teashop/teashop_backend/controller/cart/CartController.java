package com.teashop.teashop_backend.controller.cart;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teashop.teashop_backend.model.cart.Cart;
import com.teashop.teashop_backend.model.cart.CartRequest;
import com.teashop.teashop_backend.model.cart.CartUpdateRequest;
import com.teashop.teashop_backend.model.order.Order;
import com.teashop.teashop_backend.model.order.OrderDetails;
import com.teashop.teashop_backend.model.order.OrderDetailsRepository;
import com.teashop.teashop_backend.model.order.OrderRepository;
import com.teashop.teashop_backend.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    
    // Constructor injection (recommended approach)
    public CartController(CartService cartService, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository) {
        this.cartService = cartService;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @GetMapping("/{userID}")
    public List<Cart> getCartItems(@PathVariable("userID") int userID) {
        return cartService.getCartItems(userID);
    }

    @PutMapping("/add-order/{userID}")
    public ResponseEntity<?> addOrder(@PathVariable("userID") int userID, @RequestBody(required = false) Map<String, Object> requestBody) {
        try {
            // Create new order
            Order order = new Order();
            order.setUserID(userID);
            order.setStatus("Paid");
            order.setOrderDate(new java.util.Date());
            
            // Special handling for guest user (userID = -1)
            if (userID == -1 && requestBody != null && requestBody.containsKey("totalAmount")) {
                //Get the total from the request body
                double totalAmount = Double.parseDouble(requestBody.get("totalAmount").toString());
                order.setTotalAmount(totalAmount);
                
                // Save order to get generated ID
                Order savedOrder = orderRepository.save(order);
                
                // Loop through cart items in the cart
                if (requestBody.containsKey("cartItems") && requestBody.get("cartItems") instanceof List) {
                    List<Map<String, Object>> cartItems = (List<Map<String, Object>>) requestBody.get("cartItems");
                    
                    for (Map<String, Object> item : cartItems) {
                        OrderDetails orderDetails = new OrderDetails();
                        orderDetails.setOrderID(savedOrder.getOrderID());
                        
                        int productID = Integer.parseInt(item.get("productID").toString());
                        int quantity = Integer.parseInt(item.get("quantity").toString());
                        float price = Float.parseFloat(item.get("price").toString());
                        
                        orderDetails.setProductID(productID);
                        orderDetails.setQty(quantity);
                        orderDetails.setPrice(price);
                        
                        orderDetailsRepository.save(orderDetails);
                    }
                }
                
                return ResponseEntity.ok(savedOrder);
            } else {
                // Regular user flow
                order.setTotalAmount(cartService.getTotalPrice(userID));
                
                // Save order to get generated ID
                Order savedOrder = orderRepository.save(order);
                
                // Get cart items
                List<Cart> cartItems = cartService.getCartItems(userID);
                
                // Create order details for each cart item
                for (Cart cartItem : cartItems) {
                    OrderDetails orderDetails = new OrderDetails();
                    orderDetails.setOrderID(savedOrder.getOrderID());
                    orderDetails.setProductID(cartItem.getProduct().getProductID());
                    orderDetails.setQty(cartItem.getQuantity());
                    orderDetails.setPrice(cartItem.getProduct().getPrice());
                    orderDetailsRepository.save(orderDetails);
                    
                    // Remove item from cart after adding to order
                    cartService.removeFromCart(cartItem.getCartID());
                }
                
                return ResponseEntity.ok(savedOrder);
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request) {
        try {
            Cart cart = cartService.addToCart(request.getUserID(), request.getProductID(), request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //Remove a single item from the cart
    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartId) {
        try {
            cartService.removeFromCart(cartId.intValue());
            return ResponseEntity.ok("Item removed from cart and inventory updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error removing item: " + e.getMessage());
        }
    }
    
    //Remove all cart items for a user
    @DeleteMapping("/remove-items/{userID}")
    public ResponseEntity<?> clearCart(@PathVariable int userID) {
        try {
            List<Cart> cartItems = cartService.getCartItems(userID);
            
            
            for (Cart item : cartItems) {
                cartService.removeFromCart(item.getCartID());
            }
            
            return ResponseEntity.ok("Cart cleared successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error clearing cart: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuantity(@RequestBody CartUpdateRequest request) {
        try {
            Cart cart = cartService.updateQuantity(request.getCartId(), request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}