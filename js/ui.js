
import { state } from "./state.js";
import { filterTodos, countActiveTodos } from "./todo-logic.js";

export function render() {
    const todoList = document.getElementById("todo-list");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (!todoList) return;

    const visibleTodos = filterTodos(state.todos, state.filter);

    todoList.textContent = "";

    visibleTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.dataset.action = "toggle";
        checkbox.dataset.id = todo.id;
        checkbox.setAttribute("aria-label", "Mark task as complete");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = todo.id;

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li);
    });

    if (taskCount) {
        const remaining = countActiveTodos(state.todos);
        taskCount.textContent = `${remaining} tasks remaining`;
    }

    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === state.filter
        );
    });
}
