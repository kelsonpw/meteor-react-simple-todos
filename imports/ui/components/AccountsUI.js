import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

const AccountsUI = () => {
  const containerRef = useRef();
  let view;
  useEffect(() => {
    view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(containerRef.current)
    );

    return () => Blaze.remove(view);
  }, []);

  return <span ref={containerRef} />;
};

export default AccountsUI;
