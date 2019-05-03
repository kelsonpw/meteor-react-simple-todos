import React, { useState, useCallback, useRef } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks';
import Task from './components/Task';
import AccountsUI from './components/AccountsUI';
import { Meteor } from 'meteor/meteor';

const App = ({ currentUser, tasks, incompleteCount }) => {
  const inputRef = useRef();

  const [hideCompleted, setHideCompleted] = useState(false);
  const toggleHideCompleted = useCallback(
    () => setHideCompleted(!hideCompleted),
    [setHideCompleted, hideCompleted]
  );

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      Meteor.call('tasks.insert', inputRef.current.value);

      inputRef.current.value = '';
    },
    [inputRef]
  );

  const filteredTasks = tasks.filter(
    ({ checked }) => !hideCompleted || !checked
  );
  return (
    <div className="container">
      <header>
        <h1>Todo List ({incompleteCount})</h1>

        <label htmlFor="" className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={hideCompleted}
            onClick={toggleHideCompleted}
          />
          Hide Completed tasks
        </label>

        <AccountsUI />
        {currentUser && (
          <form onSubmit={handleSubmit} className="new-task">
            <input
              type="text"
              placeholder="Type to add new tasks"
              ref={inputRef}
            />
          </form>
        )}

        {filteredTasks.map(task => (
          <Task
            key={task._id}
            showPrivate={currentUser && currentUser._id === task.owner}
            {...task}
          />
        ))}
      </header>
      <ul />
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
