import React, { PropTypes } from 'react';

export const DisplayMessage = props => (
  <li className="collection-item avatar">
    <i className="material-icons circle pink darken-4">message</i>
    <p>{props.content}</p>
    <p className="right-align">{props.author}</p>
    <hr />
  </li>
);

DisplayMessage.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default DisplayMessage;
