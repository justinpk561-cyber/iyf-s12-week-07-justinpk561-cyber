import { products } from "./products.js";
import {
    state,
    getCartCount,
    getCartTotal
} from "./state.js";

function formatPrice(price) {
    return `Ksh ${price.toLocaleString("en-KE")}`;
}

export function renderProducts() {
    const productList = document.getElementById("product-list");

    productList.textContent = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        const name = document.createElement("span");
        name.textContent = `${product.name} - ${formatPrice(product.price)}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.dataset.id = product.id;
        button.dataset.action = "add";

        div.append(name, button);
        productList.appendChild(div);
    });
}

export function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.textContent = "";

    state.cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`;

        const button = document.createElement("button");
        button.textContent = "Remove";
        button.dataset.id = item.id;
        button.dataset.action = "remove";

        li.append(details, button);
        cartItems.appendChild(li);
    });

    cartCount.textContent = getCartCount();
    cartTotal.textContent = formatPrice(getCartTotal());
}
