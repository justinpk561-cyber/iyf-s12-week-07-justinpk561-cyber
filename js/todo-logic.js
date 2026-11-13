
// Add a new todo
export function addTodo(todos, text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    return [...todos, newTodo];
}

// Toggle todo completion
export function toggleTodo(todos, id) {
    return todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );
}

// Delete a todo
export function deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id);
}

// Clear completed todos
export function clearCompleted(todos) {
    return todos.filter(todo => !todo.completed);
}

// Filter todos
export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (filter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

// Count remaining todos
export function countActiveTodos(todos) {
    return todos.filter(todo => !todo.completed).length;
}
