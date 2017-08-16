import React, {PropTypes} from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    if(this.props.messageContent){  
      return(
        <div className="container boardMessage">
          <div className="collection">
            <div className="collection-item avatar">
              <i className="material-icons circle">message</i>
              <h6 className="title">{this.props.messageContent}<br/><span>{this.props.messageAuthor}</span></h6>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <hr />
        </div>
      );
    }
  }
}

Message.propTypes = {
  messageContent: PropTypes.string
};

export default Message;
