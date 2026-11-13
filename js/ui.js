import { state } from "./state.js";
import { filterTodos, countActiveTodos } from "./todo-logic.js";

export function render() {
    const todoList = document.getElementById("todo-list");
    const remainingCount = document.getElementById("remaining-count");

    if (!todoList) return;

    const visibleTodos = filterTodos(state.todos, state.filter);

    todoList.innerHTML = "";

    visibleTodos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${todo.text}</span>
            <button data-action="toggle" data-id="${todo.id}">
                ${todo.completed ? "Undo" : "Complete"}
            </button>
            <button data-action="delete" data-id="${todo.id}">
                Delete
            </button>
        `;

        if (todo.completed) {
            li.style.textDecoration = "line-through";
        }

        todoList.appendChild(li);
    });

    if (remainingCount) {
        remainingCount.textContent = countActiveTodos(state.todos);
    }
              }
