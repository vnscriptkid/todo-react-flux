const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { Task } = require('./models/Task');
require('dotenv').config();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@ds353457.mlab.com:53457/todo-react-flux`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Failed to connect to DB', err));

// routes
app.get('/', (req, res) => {
  res.send({ todo: 'works!' });
});

// api
app.post('/api/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(taskSaved => {
      res.send(taskSaved);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    res.send(e);
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id });
    res.send({ id: 'deleted' });
  } catch (e) {
    res.send(e);
  }
});

// start server
const port = 3007;
app.listen(port, () => {
  console.log('Server is listening on port ', port);
});
