import { EventEmitter } from 'events';
import { dispatcher } from '../dispatcher';
import { ADD_TASK, RECEIVED_TASKS, REMOVE_TASK } from '../types';

class TasksStore extends EventEmitter {
  constructor() {
    super();
    this.action = this.action.bind(this);
    this.taskList = [];
  }

  getTasks() {
    return this.taskList.slice(0);
  }

  _addTask(task) {
    const tasks = this.taskList.slice(0);
    tasks.push(task);
    this.taskList = tasks;
    this.emit('change');
  }

  _populateTasks(taskList) {
    this.taskList = taskList;
    this.emit('change');
  }

  _removeTask(id) {
    this.taskList = this.taskList.filter(task => task._id !== id);
    this.emit('change');
  }

  action({ type, payload }) {
    console.log('Store received an action: ', type, payload);
    switch (type) {
      case ADD_TASK:
        this._addTask(payload);
        break;
      case RECEIVED_TASKS:
        this._populateTasks(payload);
        break;
      case REMOVE_TASK:
        this._removeTask(payload);
        break;
      default:
        return;
    }
  }
}

export const tasksStore = new TasksStore();

dispatcher.register(tasksStore.action);
console.log('register action handler done');
