import { getFromStorage, saveToStorage } from "./storage.js";
import {
    addTodo as addTodoLogic,
    toggleTodo as toggleTodoLogic,
    deleteTodo as deleteTodoLogic
} from "./todo-logic.js";

const STORAGE_KEY = "todos";
const FILTER_KEY = "filter";

export const state = {
    todos: getFromStorage(STORAGE_KEY, []),
    filter: getFromStorage(FILTER_KEY, "all")
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
    state.filter = filter;
    commit();
}
export function clearCompletedTodos() {
    state.todos = clearCompletedLogic(state.todos);
    commit();
}
