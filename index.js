const express = require('express');
const { createToDo, updateToDo } = require('./types');
const { todo } = require('./db');
const app = express()
const cors = require('cors')
const PORT = 3000
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.json({
        message: "server is running"
    })
})


app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createToDo.safeParse(createPayload)  //zod validation
    if (!parsePayload.success) {
        res.status(411).json({
            messege: 'you passed wrong data '
        })
        return;

    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        messege: "todo created",
        data: {
            title: createPayload.title,
            description: createPayload.description
        }

    })
})






app.get('/todo', async (req, res) => {
    const todos = await todo.find();
    res.json({
        messege: todos
    })
})



app.put('/todo', async (req, res) => {
    try {
        const todos = await todo.updateOne(
            { _id: req.body.id },
            { $set: { completed: true } }
        );


        res.json({
            message: 'Todo updated',
            id: req.body.id,
            data: todos
        });
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error });
    }
});


app.delete('/todo', async (req, res) => {
    const id = req.body.id;
    try {
        const todos = await todo.deleteOne({ _id: id });
        const todoData = await todo.find();

        res.json({
            message: 'Todo deleted',
            id: id,
            data: todoData
        });
    } catch (error) {
        console.log(error)
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

