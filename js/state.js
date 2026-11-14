import { getFromStorage, saveToStorage } from "./storage.js";

import {
    addTodo as addTodoLogic,
    toggleTodo as toggleTodoLogic,
    deleteTodo as deleteTodoLogic,
    clearCompleted as clearCompletedLogic
} from "./todo-logic.js";

const STORAGE_KEY = "todos";
const FILTER_KEY = "filter";

const savedTodos = getFromStorage(STORAGE_KEY, []);
const savedFilter = getFromStorage(FILTER_KEY, "all");

export const state = {
    todos: Array.isArray(savedTodos) ? savedTodos : [],
    filter: ["all", "active", "completed"].includes(savedFilter)
        ? savedFilter
        : "all"
};

export function commit() {
    saveToStorage(STORAGE_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.filter);
}

export function addTodo(text) {
    state.todos = addTodoLogic(state.todos, text);
    commit();
}

export function toggleTodo(id) {
    state.todos = toggleTodoLogic(state.todos, id);
    commit();
}

export function deleteTodo(id) {
    state.todos = deleteTodoLogic(state.todos, id);
    commit();
}

export function setFilter(filter) {
    if (!["all", "active", "completed"].includes(filter)) return;

    state.filter = filter;
    commit();
}

export function clearCompletedTodos() {
    state.todos = clearCompletedLogic(state.todos);
    commit();
}
