const express = require('express');
const path = require('path');

const app = express()

let todos = [{ id: 1, text: 'Learn Node' }, { id: 2, text: 'Learn React' }]

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/addTodo', (req, res) => {
    let todo = req.body
    todo.id = Math.floor(Math.random() * 100)
    todos.push(todo)
})

app.post('/removeTodo', (req, res) => {
    console.log(todos)
    let todo = req.body
    console.log(todo)
    todos = todos.filter(t => t.id !== todo.id)
    console.log(todos)
})

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})