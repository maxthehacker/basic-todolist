const getTodos = async () => {
    console.log('called getTodos')
    const todos = await fetch('/todos')
        .then(res => res.json())
        .then(todos => {
            console.log(todos)
            return todos;
        });

        
        
        const todoList = document.getElementById('todos');
    if(todos.length === 0) {
        todoList.innerHTML = '<p>No more todos</p>'
        return
    }
    todoList.innerHTML = '';

    todos.forEach((element) => {
        const todo = document.createElement('li');
        todo.innerHTML = element.text; 
        todo.onclick = () => {
            console.log('clicked')
            removeTodo(element.id);
            getTodos();
        }
        todoList.appendChild(todo);        
    });
}


const createTodo = async (text) => {
    const todo = {
        text: text,
    }
    await fetch('/addTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
}

document.getElementById('todoForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = document.getElementById('todo-input').value
    createTodo(todoText)
    document.getElementById('todo-input').value = ''
    getTodos()
})


const removeTodo = async (id) => {
    await fetch('/removeTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
}

getTodos()

