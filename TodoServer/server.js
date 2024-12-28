const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 4040;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/Todo", {
  dbName: 'ToDo'
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const todoDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true }, // Corrected spelling
  endDate: { type: String, required: true },
  isCompleted: { type: Boolean, required: true }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoDataSchema);

app.post('/todo-add', async (req, res) => {
  try {
    let body = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      isCompleted: req.body.isCompleted
    }
    saveTodoData = await Todo.create(body);
    res.status(200).send("data added successfully")

  } catch (error) {
    console.error('Error in /add-company:', error);
    res.status(500).json({
      message: 'Failed to process request.',
      error: error.message,
    });
  }
})

app.get('/todo-get', async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (error) {
    console.error('Error retrieving companies:', error);
    res.status(500).json({
      message: 'Failed to retrieve companies.',
      error: error.message,
    });
  }
})

app.delete('/todo-delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.deleteOne({ _id: id });

    if (deletedTodo.deletedCount === 0) {
      return res.status(404).send({ success: false, message: "Todo not found" });
    }

    res.send({ success: true, message: "Todo successfully deleted" });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      message: 'Failed to delete todo.',
      error: error.message,
    });
  }
});



app.put('/todo-update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateTodo = await Todo.updateOne({ _id: id }, req.body);

    if (updateTodo.nModified === 0) {
      return res.status(404).send({ success: false, message: "Todo not found or no changes made" });
    }

    res.send({ success: true, message: "Todo updated successfully" });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      message: 'Failed to update todo.',
      error: error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
