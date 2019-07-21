import React from 'react';
import { addTaskAsync } from '../flux/actions/tasks';
import '../flux/stores/tasks';
import { TaskList } from './TaskList';

class App extends React.Component {
  handleAddTask = () => {
    const task = {
      text: this.taskInput.value
    };
    addTaskAsync(task);
    // clean up after adding
    this.taskInput.value = '';
  };

  render() {
    return (
      <div>
        <h1>Task App</h1>
        <input ref={ref => (this.taskInput = ref)} type='text' />
        <button onClick={this.handleAddTask}>Add Task</button>
        <TaskList />
      </div>
    );
  }
}

export default App;
