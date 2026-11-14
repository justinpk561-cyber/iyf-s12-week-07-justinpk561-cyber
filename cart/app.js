import { addToCart, removeFromCart } from "./state.js";
import { products } from "./products.js";
import { renderProducts, renderCart } from "./ui.js";

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");

// Display products and cart
renderProducts();
renderCart();

// Handle adding products
productList.addEventListener("click", event => {
    const button = event.target.closest('button[data-action="add"]');

    if (!button) return;

    const productId = Number(button.dataset.id);
    const product = products.find(item => item.id === productId);

    if (product) {
        addToCart(product);
        renderCart();
    }
});

// Handle removing products
cartItems.addEventListener("click", event => {
    const button = event.target.closest('button[data-action="remove"]');

    if (!button) return;

    const productId = Number(button.dataset.id);

    removeFromCart(productId);
    renderCart();
});
