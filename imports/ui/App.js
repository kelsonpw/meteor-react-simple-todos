import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks'
import Task from './components/Task';

const App = ({ tasks }) => {
  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      <ul>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default withTracker(() => ({
  tasks: Tasks.find({}).fetch(),
}))(App);
