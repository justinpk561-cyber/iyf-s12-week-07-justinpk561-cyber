// Save data to localStorage
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve data from localStorage
export function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

// Remove data from localStorage
export function removeFromStorage(key) {
    localStorage.removeItem(key);
}
