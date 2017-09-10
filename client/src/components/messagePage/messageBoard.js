import React, {PropTypes} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../auth';
import $ from 'jquery';
import DisplayMessage from './displayMessage';
import PlatformUsers from './platformUsers';
import { 
  sendMessage, 
  loadGroupMessages, 
  loadPlatformUsers,
  loadGroupUsers,
  readMessages,
  searchUsers
} from '../../actions/messageActions';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = ({
      groupId: this.props.Messages.groupId,
      messages: [],
      unreadMessages: [],
      readMessages: [],
      isLoggedIn: this.props.auth.isLoggedIn,
      addUser: "",
      PlatformUsers: [],
      groupUsers: [],
      otherUsers: [],
      unread: true,
      userId: this.props.auth.userId
    });

    this.inputUser = this.inputUser.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.autoHide = this.autoHide.bind(this);
    this.toggleUnread = this.toggleUnread.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    if (this.state.groupId){
      this.props.loadGroupMessages(this.state.groupId, this.state.userId);
      this.props.loadGroupUsers(this.state.groupId);
    } else {
      this.props.history.push('/broadpage');
    }
    
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn,
      messages: nextProps.Messages.messages,
      unreadMessages: nextProps.Messages.unreadMessages,
      readMessages: nextProps.Messages.readMessages,
      PlatformUsers: nextProps.Messages.PlatformUsers,
      groupUsers: nextProps.Messages.groupUsers,
      offset: 0
    });
    this.props.readMessages(this.state.groupId);
    if (!nextProps.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }

  componentDidUpdate() {
    // this.filterUsers();
    // console.log('here');
  }

  componentWillUnmount() {
    this.props.readMessages(this.state.groupId);
  }

  onSend(e){
    const {_message, _priority} = this.refs;
    e.preventDefault();
    _message.value = _message.value.trim();
    if (_message.value.length > 0) {
      this.props.sendMessage(
        _message.value, 
        this.props.Messages.groupId, 
        _priority.value
      )
      .then(() => this.props.loadGroupMessages(
        this.state.groupId, 
        this.state.userId
      ),
      err => console.log(err));
      _priority.value = "NORMAL";
    }
    _message.value = "";
  }

  inputUser() {
    const { _user } = this.refs;
    _user.value = _user.value.trim();
    this.setState({
      addUser: _user.value
    });
    this.props.searchUsers(this.state.offset, _user.value);
  }

  prevPage(e) {
    e.preventDefault();
    if (this.state.offset > 0) {
      // this.props.searchUsers(this.state.offset - 1, this.state.addUser);
      let num = this.state.offset;
      this.setState({
        offset: num - 1
      });
    }
  }

  nextPage(e) {
    const { _user } = this.refs;
    e.preventDefault();
    console.log('increment by 1');
    // this.props.searchUsers(this.state.offset + 1, this.state.addUser);
    console.log('before set new state');
    let num = this.state.offset;
    console.log('after set new state');
    this.setState({
      offset: num + 1
    });
    console.log('finally done setting state');
    // this.props.searchUsers(2, _user.value);
  }

  filterUsers(){
    let filteredUsers = [];
    this.state.PlatformUsers.forEach((pUser) => {
      let condition = false;
      this.state.groupUsers.forEach((gUser) => {
        if (pUser.UserName == gUser.User.UserName){
          condition = true;
        }
      });
      if(!condition) {
        filteredUsers.push(pUser);
      }
    });
    this.setState({
      otherUsers: filteredUsers
    });
  }

  toggleUnread() {
    if(this.state.unread){
      this.setState({
        unread: false
      });
    } else {
      this.setState({
        unread: true
      });
    }
  }

  autoHide() {
    $(() => {
      $('body #input').on('focus', () => {
        $('#hide').removeClass('hide');
        $('#hide').addClass('show');
      });

      $('body #input').on('focusout', () => {
        $('#hide').removeClass('show');
        $('#hide').addClass('hide');
      });
    });
  }

  render () {

    return (
      <div className="container">
        <div className="row messageBoard">
        <Link to="/broadpage">
          <img
          width="70px"
            alt="back"
            src={require("../../image/back.png")}
            className="click"
          />
        </Link>
          <div className="col s12">
            <div className="col s8">
              
            <div>
              <div className="card-tabs">
                <ul className="tabs tabs-fixed-width">
                  <li 
                    className={this.state.unread ?
                    "tab click underline" :
                    "tab click"}
                    onClick={this.toggleUnread}
                  >
                    UNREAD MESSAGES
                  </li>
                  <li
                    className={!this.state.unread ?
                    "tab click underline" :
                    "tab click"}
                    onClick={this.toggleUnread}
                  >
                    READ MESSAGES
                  </li>
                </ul>
              </div>

              <div>
                {(this.state.unread) ? 
                  <div className="message">
                    {this.state.unreadMessages &&
                      this.state.unreadMessages.length > 0 ?
                      <ul className="collection">
                        {this.state.unreadMessages.map((message, i) => {
                          return (
                            <div key={i}>
                              <DisplayMessage
                                content={message.content}
                                author={message.authorsName}
                              />
                            </div>
                          );
                        })}  
                      </ul>:
                      <div className="center-align">No new message</div>
                    }
                  </div> :
                  <div className="message">
                    {(this.state.readMessages && 
                    this.state.readMessages.length > 0) &&
                      <ul className="collection">
                        {
                          this.state.readMessages.map((message, i) => {
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
                    }
                  </div>
                }
              </div>
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
                      <option value="NORMAL">Normal</option>
                      <option value="URGENT">Urgent</option>
                      <option value="CRITICAL">Critical</option>
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
                      id="input"
                      ref="_user"
                      className="validate"
                      type="text"
                      placeholder="Add User"
                      onChange={this.inputUser}
                    />
                  </div>
                </form>
              </div>

              <div>
              {(
                this.state.PlatformUsers && 
                this.state.PlatformUsers.length > 0
                ) && 
                <ul className="col s12 collection">
                  {this.state.PlatformUsers
                  .map((platformUser, i) => {
                    return(
                      <PlatformUsers key={i} platformUser={platformUser} />
                    );
                  })}
                </ul>
                }
                <div className="row addUser">
                  <div className="col s2"></div>
                  <div className="">
                    <button
                    className="col s3 btn waves-effect waves-light green darken-4"
                    onClick={this.prevPage}
                    >
                      Back
                    </button>
                  </div>
                  <div className="col s2 center-align">{this.state.offset + 1}</div>
                  <div className="">
                    <button
                      className="col s3 btn waves-effect waves-light green darken-4"
                      onClick={this.nextPage}
                    >
                      Next
                    </button>
                  </div>
                  <div className="col s2"></div>
                </div>
              </div>

              {this.state.groupUsers && this.state.groupUsers.length > 0 &&
                <div>
                  {this.state.groupUsers.map((user, i) => {
                    return (
                      <ul className="collection" key={i}>
                        <li className="collection-item">
                          {user.User.UserName}
                        </li>
                      </ul>
                    );
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
  { 
    sendMessage, 
    loadGroupMessages, 
    loadPlatformUsers, 
    loadGroupUsers, 
    readMessages,
    searchUsers
  }
) (withRouter(MessageBoard));
