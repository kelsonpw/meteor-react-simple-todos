import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

const Task = ({ _id, text, checked, username, private, showPrivate }) => {
  const toggleChecked = useCallback(() => {
    Meteor.call('tasks.setChecked', _id, !checked);
  }, [_id, checked]);

  const deleteTask = useCallback(() => {
    Meteor.call('tasks.remove', _id);
  }, [_id]);

  const togglePrivate = useCallback(() => {
    Meteor.call('tasks.setPrivate', _id, !private);
  }, [_id, private]);

  const taskClassName = useMemo(() => classnames({ checked, private }), [
    checked,
    private,
  ]);
  
  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={Boolean(checked)}
        onClick={toggleChecked}
      />
      {showPrivate && (
        <button className="toggle-private" onClick={togglePrivate}>
          {private ? 'Private' : 'Public'}
        </button>
      )}
      <span className="text">
        <strong>{username}</strong> {text}
      </span>
    </li>
  );
};

Task.propTypes = {
  _id: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  createdAt: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default Task;
