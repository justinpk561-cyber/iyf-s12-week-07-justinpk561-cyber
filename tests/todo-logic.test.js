import { describe, it, expect } from "vitest";

import {
    addTodo,
    toggleTodo,
    deleteTodo,
    filterTodos,
    countActiveTodos,
    clearCompleted
} from "../js/todo-logic.js";

describe("Todo Logic", () => {
    const todos = [
        { id: 1, text: "Learn JavaScript", completed: false },
        { id: 2, text: "Practice coding", completed: true }
    ];

    it("adds a new todo", () => {
        const result = addTodo(todos, "Build a project");

        expect(result).toHaveLength(3);
    });

    it("toggles a todo", () => {
        const result = toggleTodo(todos, 1);

        expect(result[0].completed).toBe(true);
    });

    it("deletes a todo", () => {
        const result = deleteTodo(todos, 1);

        expect(result).toHaveLength(1);
    });

    it("filters active todos", () => {
        const result = filterTodos(todos, "active");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
    });

    it("counts active todos", () => {
        expect(countActiveTodos(todos)).toBe(1);
    });

    it("clears completed todos", () => {
        const result = clearCompleted(todos);

        expect(result).toHaveLength(1);
        expect(result[0].completed).toBe(false);
    });
});
