const { model, Schema } = require('mongoose')


const todoSchema = new Schema({
    id: {
        type: Number,
    },
    text: {
        type: String,
    },
})

const Todo = model('Todo', todoSchema)

module.exports = Todo