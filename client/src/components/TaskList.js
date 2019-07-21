import React from 'react';
import { tasksStore } from '../flux/stores/tasks';
import { fetchTaskAsync, removeTaskAsync } from '../flux/actions/tasks';

class TaskList extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    // initial fetch
    fetchTaskAsync();

    // listen for change
    tasksStore.on('change', this.getTaskList);
  }

  getTaskList = () => {
    this.setState({ tasks: tasksStore.getTasks() });
  };

  handleRemoveClick = id => {
    removeTaskAsync(id);
  };

  render() {
    return (
      <React.Fragment>
        <h2>Task List</h2>
        <ul>
          {this.state.tasks.map(task => (
            <li key={task._id}>
              {task.text}
              <button onClick={() => this.handleRemoveClick(task._id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export { TaskList };
