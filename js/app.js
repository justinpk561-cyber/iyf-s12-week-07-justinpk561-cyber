import {
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    state
} from "./state.js";

import { render } from "./ui.js";

// Get HTML elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Add a new todo
todoForm.addEventListener("submit", event => {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") return;

    addTodo(text);
    todoInput.value = "";
    render();
});

// Handle todo buttons
todoList.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.dataset.action === "toggle") {
        toggleTodo(id);
    }

    if (button.dataset.action === "delete") {
        deleteTodo(id);
    }

    render();
});

// Handle filters
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
        render();
    });
});

// Display saved todos when the app starts
render();
