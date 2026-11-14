const STORAGE_KEY = "shopping-cart";

function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(savedCart)) {
            return [];
        }

        return savedCart.filter(item =>
            item &&
            Number.isInteger(item.id) &&
            typeof item.name === "string" &&
            Number.isFinite(item.price) &&
            item.price >= 0 &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch {
        return [];
    }
}

export const state = {
    cart: loadCart()
};

export function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

export function addToCart(product) {
    const existingItem = state.cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }

    saveCart();
}

export function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
}

export function getCartCount() {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
    return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}
