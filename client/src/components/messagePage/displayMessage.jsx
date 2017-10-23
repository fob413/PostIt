import React, {PropTypes} from 'react';

class DisplayMessage extends React.Component {
  render() {
    return(
      <li className="collection-item avatar">
        <i className="material-icons circle green darken-4">message</i>
        <p>{this.props.content}</p>
        <p className="right-align">{this.props.author}</p>
        <hr />
      </li>
    );
  }
}

DisplayMessage.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default DisplayMessage;
