import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Task = ({ task }) => (
  <li>{`${task.text} ${task.createdAt.toLocaleDateString()}`}</li>
);

Task.propTypes = {
  task: PropTypes.objectOf({
    _id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default Task;
