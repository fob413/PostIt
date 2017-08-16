import React, {PropTypes} from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    return(
      <div className="container boardMessage">
        <i className="material-icons">message</i>
        <h6>{this.props.messageContent}<br/><span>{this.props.messageAuthor}</span></h6>
        <hr /> 
      </div>
    );
  }
}

Message.propTypes = {
  messageContent: PropTypes.string.isRequired
};

export default Message;
