import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Task = ({ task }) => (
  <li>{`${task.text} ${task.createdAt.toLocaleDateString()}`}</li>
);

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
  }),
};

export default Task;
