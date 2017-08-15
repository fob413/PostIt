import React, {PropTypes} from 'react';
import DisplayMessage from './displayMessage';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.groups = this.props.store.getState().groups;
    this.currentGroup = this.props.currentGroup;
    this.onSend = this.onSend.bind(this);
    this.state = ({
      messages: []
    });
    this.loadMessages = this.loadMessages.bind(this);
  }

  componentWillMount(){
    console.log('i just got mounted');
    this.loadMessages();
  }

  componentWillUnmount(){
    console.log('unmounting now');
  }

  loadMessages(){
    this.groups.map((group, i) => {
      if (group.groupId == this.currentGroup){
        this.setState({
          messages: group.Group.Messages
        });
      }
    });
  }

  onSend(e){
    const {_message, _priority} = this.refs;
    e.preventDefault();
    _message.value = _message.value.trim();
    if (_message.value.length > 0) {
      this.props.sendMessage(_message.value, _priority.value);
    }
  }


  render () {
    return (
      <div className="container">
        <div className="row messageBoard">
        <img
        width="30px"
          alt="back"
          src={require("../../../image/back.png")}
          className="click"
          onClick={this.props.toggleMessageBoard}
        />
          <div className="col s12">
            <div className="col s8">
              <div className="message">
                <ul className="collection">
                  {this.state.messages.map((message, i) => {
                    return (
                      <div key={i}>
                        <DisplayMessage
                          content={message.content}
                          author={message.authorsName}
                        />
                      </div>
                    );
                  })}
                </ul>
              </div>

              <div className="row">
                <form onSubmit={this.onSend}>
                  <div className="input-field col s12">
                    <input
                      ref="_message" 
                      className="sendMessage" 
                      type="text" 
                      placeholder="Type A Message" 
                    />
                  </div>

                  <div className="col m4 browser-default">
                    <select
                      defaultValue="1" 
                      ref="_priority" 
                      className="browser-default"
                    >
                      <option value="1">Normal</option>
                      <option value="2">Urgent</option>
                      <option value="3">Critical</option>
                    </select>
                  </div>
                  
                  <div className="right">
                    <button
                      className="btn-large green darken-4 waves effect"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
              
            </div>

            <div className="col s4">
              <div>
                <form className="col s12">
                  <div className="row">
                    <input
                      className="validate"
                      type="text"
                      placeholder="Add User"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  toggleMessageBoard: PropTypes.func.isRequired
}

export default MessageBoard;
