import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert2';
import Modal from 'react-modal';
import shortid from 'shortid';
import DisplayMessage from './DisplayMessage';
import PlatformUsers from './PlatformUsers';
import {
  sendMessage,
  loadGroupMessages,
  loadGroupUsers,
  readMessages,
  searchUsers
} from '../../actions/messageActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%'
  }
};

/**
 * renders a group and all its properties; messages, groupUsers
 * @class MessageBoard
 * @extends {React.Component}
 */
export class MessageBoard extends React.Component {

  /**
   * Creates an instance of MessageBoard.
   * @param {any} props
   * @memberof MessageBoard
   */
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = ({
      groupId: this.props.Messages.groupId,
      messages: [],
      unreadMessages: [],
      readMessages: [],
      isLoggedIn: this.props.auth.isLoggedIn,
      addUser: '',
      PlatformUsers: [],
      groupUsers: [],
      otherUsers: [],
      unread: true,
      userId: this.props.auth.userId,
      modalIsOpen: false,
      count: 0,
      pageCount: 0,
      offset: 0,
      message: '',
      user: '',
      priority: 'NORMAL'
    });

    this.inputUser = this.inputUser.bind(this);
    this.toggleUnread = this.toggleUnread.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.openThisModal = this.openThisModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  /**
   * makes api calls on mounting the group if groupid is given
   * or redirect to dashboard if groupid isn't given
   * @memberof MessageBoard
   * @return {void}
   */
  componentDidMount() {
    if (this.state.groupId) {
      this.props.loadGroupMessages(this.state.groupId, this.state.userId);
      this.props.loadGroupUsers(this.state.groupId);
      this.props.readMessages(this.state.groupId);
    } else {
      this.props.history.push('/dashboard');
    }
  }


  /**
   * updates the components states based on update in the store
   * or from parent components
   * @param {any} nextProps
   * @memberof MessageBoard
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn,
      messages: nextProps.Messages.messages,
      unreadMessages: nextProps.Messages.unreadMessages,
      readMessages: nextProps.Messages.readMessages,
      PlatformUsers: nextProps.Messages.PlatformUsers,
      groupUsers: nextProps.Messages.groupUsers,
      count: nextProps.Messages.pageCount
    });
    this.props.readMessages(this.state.groupId);
    if (!nextProps.auth.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  /**
   * @param {any} event
   * @memberof Signin
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * sends a message to the current group
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  onSend(event) {
    event.preventDefault();
    let { message } = this.state;
    const { priority } = this.state;
    message = message.trim();
    if (message.length > 0) {
      this.props.sendMessage(
        message,
        this.props.Messages.groupId,
        priority
      )
      .then(() => this.props.loadGroupMessages(
        this.state.groupId,
        this.state.userId
      ),
      (err) => {
        swal('Oops...', err.message, 'error');
      });
      this.setState({
        priority: 'NORMAL'
      });
    }
    this.setState({
      message: '',
      prority: 'NORMAL'
    });
  }

  /**
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  openThisModal(event) {
    event.preventDefault();
    swal('Hello world');
  }


  /**
   * search for users on the platform
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  inputUser(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    let user = event.target.value;
    user = user.trim();
    if (user.length === 0) {
      this.setState({
        addUser: '',
        PlatformUsers: [],
        count: 0,
        pageCount: 0
      });
    } else {
      this.props.searchUsers(this.state.offset, user);
      this.setState({
        addUser: user
      });
    }
  }


  /**
   * load next or previous page of users
   * @param {any} selectedPage
   * @memberof MessageBoard
   * @return {void}
   */
  pageClick(selectedPage) {
    let { user } = this.state;
    user = user.trim();
    const selected = selectedPage.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({
      offset,
      addUser: user
    });
    this.props.searchUsers(selected, user);
  }


  /**
   * load previous page of users
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  prevPage(event) {
    event.preventDefault();
    const { user } = this.state;
    if (this.state.offset > 0) {
      this.props.searchUsers(this.state.offset - 1, user);
      const num = this.state.offset;
      this.setState({
        offset: num - 1
      });
    }
  }

  /**
   * load next page of users
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  nextPage(event) {
    event.preventDefault();
    const { user } = this.state;
    this.props.searchUsers(this.state.offset + 1, user);
    const num = this.state.offset;
    this.setState({
      offset: num + 1
    });
  }

  /**
   * switch between read and unread messages
   * @memberof MessageBoard
   * @return {void}
   */
  toggleUnread() {
    if (this.state.unread) {
      this.setState({
        unread: false
      });
    } else {
      this.setState({
        unread: true
      });
    }
  }

  /**
   * @memberof MessageBoard
   * @return {void}
   */
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  /**
   * @memberof MessageBoard
   * @return {void}
   */
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  /**
   * @memberof MessageBoard
   * @return {void}
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  /**
   * message board component
   * @memberof MessageBoard
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <div className="row messageBoard">
          <div className="col s12">
            <div className="col s8">

              <div>
                <div className="card-tabs">
                  <ul className="tabs tabs-fixed-width">
                    <li
                      className="tab click"
                    >
                      <Link to="/dashboard">
                        <i className="material-icons pink-text text-darken-4">
                          backspace
                        </i>
                      </Link>
                    </li>
                    <li
                      className={this.state.unread ?
                      'tab click underline' :
                      'tab click'}
                      onClick={this.toggleUnread}
                    >
                      UNREAD MESSAGES
                    </li>
                    <li
                      className={!this.state.unread ?
                      'tab click underline' :
                      'tab click'}
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
                            {this.state.unreadMessages.map(message => (
                              <div key={shortid.generate()}>
                                <DisplayMessage
                                  content={message.content}
                                  author={message.authorsName}
                                />
                              </div>
                              ))}
                          </ul> :
                          <div className="center-align">No new message</div>
                      }
                    </div> :
                    <div className="message">
                      {(this.state.readMessages &&
                      this.state.readMessages.length > 0) &&
                        <ul className="collection">
                          {
                            this.state.readMessages.map(message => (
                              <div key={shortid.generate()}>
                                <DisplayMessage
                                  content={message.content}
                                  author={message.authorsName}
                                />
                              </div>
                              ))
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
                      className="sendMessage"
                      type="text"
                      placeholder="Type A Message"
                      name="message"
                      value={this.state.message}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="col m4 browser-default">
                    <select
                      defaultValue="1"
                      className="browser-default"
                      name="priority"
                      value={this.state.priority}
                      onChange={this.onChange}
                    >
                      <option value="NORMAL">Normal</option>
                      <option value="URGENT">Urgent</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>

                  <div className="right">
                    <button
                      className="btn pink darken-4 waves effect"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>

            </div>

            <div className="col s4">
              <div className="row">
                <button
                  onClick={this.openModal}
                  className="waves-effect waves-light btn col s12 teal darken-2 modalButton"
                >
                Add User
                </button>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <i
                  onClick={this.closeModal}
                  className="material-icons click red-text"
                >
                  highlight_off
                </i>
                <h2
                  ref={subtitle => this.subtitle = subtitle}
                  className="green-text text-darken-4 center-align"
                >
                  ADD USER
                </h2>
                <form>
                  <input
                    autoComplete="off"
                    id="input"
                    name="user"
                    value={this.state.value}
                    type="text"
                    placeholder="Add User"
                    onChange={this.inputUser}
                  />
                  <div className="addUser">

                    <div>
                      {(
                        this.state.PlatformUsers &&
                        this.state.PlatformUsers.length > 0
                      ) &&
                      <ul className="col s12 collection addUserList">
                        {this.state.PlatformUsers
                        .map(platformUser => (
                          <PlatformUsers
                            key={shortid.generate()}
                            platformUser={platformUser}
                            groupUsers={this.state.groupUsers}
                          />
                          ))
                        }
                      </ul>
                      }
                      {this.state.count > 0 &&
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          pageCount={this.state.count}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={this.pageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                      }
                    </div>
                  </div>
                </form>
              </Modal>

              {this.state.groupUsers && this.state.groupUsers.length > 0 &&
                <div>
                  <ul className="collection">
                    {this.state.groupUsers.map(user => (
                      <li className="collection-item right-align" key={shortid.generate()}>
                        {user.User.userName}
                      </li>
                      ))}
                  </ul>
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
  loadGroupUsers: PropTypes.func.isRequired,
  Messages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  readMessages: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth,
    Messages: state.Messages
  }
);

export default connect(
  mapStateToProps,
  {
    sendMessage,
    loadGroupMessages,
    loadGroupUsers,
    readMessages,
    searchUsers
  }
)(withRouter(MessageBoard));
