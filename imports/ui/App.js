import React, { useState, useCallback } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks';
import Task from './components/Task';

const App = ({ tasks }) => {
  const [formState, setFormState] = useState('');

  const setFormStateHandler = useCallback(
    evt => setFormState(evt.target.value),
    [setFormState]
  );

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      Tasks.insert({
        text: formState,
        createdAt: new Date(),
      });

      setFormState('');
    },
    [Tasks, formState, setFormState]
  );

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit} className="new-task">
          <input
            type="text"
            value={formState}
            onChange={setFormStateHandler}
            placeholder="Type to add new tasks"
          />
        </form>
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
