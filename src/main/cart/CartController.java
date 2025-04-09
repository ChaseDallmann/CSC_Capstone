@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public List<Cart> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartRequest request) {
        return cartService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity());
    }

    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok("Item removed from cart");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuantity(@RequestBody CartUpdateRequest request) {
        cartService.updateQuantity(request.getCartId(), request.getQuantity());
        return ResponseEntity.ok("Quantity updated");
    }
}