import React, {PropTypes} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../auth';
import DisplayMessage from './displayMessage';
import PlatformUsers from './platformUsers';
import { 
  sendMessage, 
  loadGroupMessages, 
  loadPlatformUsers,
  loadGroupUsers
} from '../../actions/messageActions';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = ({
      groupId: this.props.Messages.groupId,
      messages: [],
      PlatformUsers: [],
      isLoggedIn: this.props.auth.isLoggedIn,
      addUser: "",
      groupUsers: []
    });

    this.inputUser = this.inputUser.bind(this);
  }

  componentDidMount() {
    this.props.loadGroupMessages(this.state.groupId);
    this.props.loadPlatformUsers();
    this.props.loadGroupUsers(this.state.groupId);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn,
      messages: nextProps.Messages.messages,
      PlatformUsers: nextProps.Messages.PlatformUsers,
      groupUsers: nextProps.Messages.groupUsers
    });
    if (!nextProps.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }

  onSend(e){
    const {_message, _priority} = this.refs;
    e.preventDefault();
    _message.value = _message.value.trim();
    if (_message.value.length > 0) {
      alert(_message.value, _priority.value);
      this.props.sendMessage(_message.value, this.props.Messages.groupId)
      .then(() => this.props.loadGroupMessages(this.state.groupId),
      err => console.log(err));
    }
    _message.value = "";
  }

  inputUser() {
    const { _user } = this.refs;
    _user.value = _user.value.trim();
    this.setState({
      addUser: _user.value
    });
  }


  render () {
    return (
      <div className="container">
        <div className="row messageBoard">
        <Link to="/broadpage">
          <img
          width="30px"
            alt="back"
            src={require("../../image/back.png")}
            className="click"
          />
        </Link>
          <div className="col s12">
            <div className="col s8">
              <div className="message">
                <ul className="collection">
                  {(this.state.messages.length > 0) &&
                    this.state.messages.map((message, i) => {
                      return (
                        <div key={i}>
                          <DisplayMessage
                            content={message.content}
                            author={message.authorsName}
                          />
                        </div>
                      );
                    })
                  }
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
                      ref="_user"
                      className="validate"
                      type="text"
                      placeholder="Add User"
                      onChange={this.inputUser}
                    />
                  </div>
                </form>
              </div>

              {(this.state.addUser.length > 0) && 
                <div>
                  {(this.state.PlatformUsers.length > 0) && 
                  <ul className="collection">
                    {this.state.PlatformUsers.map((platformUser, i) => {
                      return(
                        <PlatformUsers key={i} platformUser={platformUser} />
                      );
                    })}
                  </ul>
                  }
                </div>
              }

              {this.state.groupUsers.length > 0 &&
                <div>
                  {this.state.groupUsers.map((user, i) => {
                    return (
                      <ul className="collection" key={i}>
                        <li className="collection-item">
                          {user.User.UserName}
                        </li>
                      </ul>
                    )
                  })}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  loadGroupMessages: PropTypes.func.isRequired,
  loadPlatformUsers: PropTypes.func.isRequired,
  loadGroupUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.MyApp,
    Messages: state.Messages
  }
);

export default connect(
  mapStateToProps,
  { sendMessage, loadGroupMessages, loadPlatformUsers, loadGroupUsers }
) (withRouter(MessageBoard));
