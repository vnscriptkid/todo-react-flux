import { dispatcher } from '../dispatcher';
import { ADD_TASK, RECEIVED_TASKS, REMOVE_TASK } from '../types';
import axios from 'axios';

export const addTaskAsync = task => {
  axios
    .post('http://localhost:3007/api/tasks', { ...task })
    .then(res => {
      console.log('Task persisted in server: ', res.data);
      addTaskSync(res.data);
    })
    .catch(err => {
      console.log('Error while adding Task Async', err);
    });
};

export const removeTaskAsync = id => {
  axios
    .delete('http://localhost:3007/api/tasks/' + id)
    .then(() => {
      removeTaskSync(id);
    })
    .catch(() => {
      console.log('Error while removing Task from Server');
    });
};

export const removeTaskSync = id => {
  dispatcher.dispatch({
    type: REMOVE_TASK,
    payload: id
  });
};

export const addTaskSync = task => {
  dispatcher.dispatch({
    type: ADD_TASK,
    payload: task
  });
};

export const fetchTaskAsync = () => {
  axios
    .get('http://localhost:3007/api/tasks')
    .then(res => {
      dispatcher.dispatch({
        type: RECEIVED_TASKS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('Error while fetching TaskList Async');
    });
};
