const products = [
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Headphones", price: 2500 },
    { id: 3, name: "Keyboard", price: 1800 },
    { id: 4, name: "Mouse", price: 1000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(price) {
    return `Ksh ${price.toLocaleString("en-KE")}`;
}

function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        const name = document.createElement("span");
        name.textContent = `${product.name} - ${formatPrice(product.price)}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        productDiv.append(name, button);
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    displayCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.id));

        li.append(details, removeButton);
        cartItems.appendChild(li);

        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
}

displayProducts();
displayCart();
