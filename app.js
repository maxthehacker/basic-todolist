const express = require('express');
const path = require('path');

const mongoose = require('mongoose')

const Todo = require('./models/Todo')

const main = async () => {
    const app = express()

    mongoose.connect('mongodb://localhost:27017/todo').then(() => {
        console.log('Connected to MongoDB')
    }).catch((e) => {
        console.log(e)
    })
    



    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    app.post('/addTodo', async (req, res) => {
        console.log(req.body)
        let todo = req.body
        todo.id = Math.floor(Math.random() * 100)
        console.log(todo)
        await Todo.create(todo)
    })

    app.post('/removeTodo', async (req, res) => {
        // console.log(todos)
        let todo = req.body
        await Todo.findOneAndDelete({ id: todo.id })
    })

    app.get('/todos', async (req, res) => {
        const todos = await Todo.find()
        console.log(todos)
        res.json(todos)
    })

    app.listen(3000, () => {
        console.log('Example app listening on port 3000!')
    })
}

main()