const express = require('express');
const app = express();

const PORT = 3000;

//Middleware to parse JSON bodies
app.use(express.json());

let todos = [
  {id:1, task:'Learn Node.js', completed:false},
  {id:2, task:'Learn APIs', completed:false}
]

//ROUTES
//DEFAULT
app.get('/', (req, res) => {
  res.json({msg:'Welcome to Todo API'})
})

//GET 
app.get('/todos', (req, res) => {
  res.json(todos);
})

//GET
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if(!todo) return res.status(404).json({error:`Todo with id:${id} not found`});
  res.json(todo);
} )

//POST
app.post('/todos', (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ error: "task is required" });
  }

  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    task: req.body.task,
    completed: false
  }
  todos.push(newTodo);
  res.status(201).json(newTodo);
})

//PUT
app.put('/todos/:id', (req, res) => {
  // const {id, task, completed} = req.body;
  // const todo = todos.find(t => t.id === parseInt(id));

  // if(!todo) return res.status(404).json({error:`Todo with id:${id} not found`});

  // //todo.task = task || todo.task;
  // task !== undefined ? task : todo.task
  // todo.completed = completed !== undefined ? completed : todo.completed;

  // res.json(todo);

  //Better version because id is from URL (req.params.id)
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return res.status(404).json({error:`Todo with id:${id} not found`});

  todos[todoIndex].task = req.body.task;
  todos[todoIndex].completed = req.body.completed;
  res.json(todos[todoIndex]);
})

app.listen(PORT, () => 
  console.log(`Server running at http://localhost:${PORT}`)
)