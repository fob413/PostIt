import React, {PropTypes} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Message from '../../messagePage/message';
import { loadCurrentGroup } from '../../../actions/messageActions';

class Group extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      groupId: '',
      unreadMessages: [],
      userId: this.props.auth.userId,
      group: this.props.showGroup
    };
    
    this.gotoGroup = this.gotoGroup.bind(this);
    this.filterUnreadMessages = this.filterUnreadMessages.bind(this);
  }

  componentDidMount() {
    const group = this.state.group;
    const id = this.state.userId;
    this.setState({
      unreadMessages: this.filterUnreadMessages(group.Messages, id)
    });
  }

  componentWillReceiveProps(nextProps){
    const group = this.state.group;
    const id = this.state.userId;
    console.log(nextProps.showGroup);
    this.setState({
      group: nextProps.showGroup,
      unreadMessages: this.filterUnreadMessages(group.Messages, id)
    });
  }

  gotoGroup(e) {
    e.preventDefault();
    this.props.loadCurrentGroup(this.props.showGroup.id);
    this.props.history.push('/messageboard');
  }

  /**
 * filter unread messages
 * @param {array} data data gotten from api call
 * @param {string} userId current user id operating the platform
 * @return {array} array of unread messages
 */
filterUnreadMessages (data, userId){
  let unreadMessages = [];
  data.map((item) => {
    // array to hold userId that have read messages
    let readby = [];
    // boolean to check if user has read a message
    let read = false;
    // split the string of read users into an array
    readby = item.readby.split(',');
    // map through the array to check if user has read the message
    readby.map(id => {
      if(id == userId){
        read = true;
      }
    });
    // push message that user hasn't read into unreadMessages
    if(!read){
      unreadMessages.push(item);
    }
  });
  return unreadMessages;
};

  render() {
    const group = this.props.showGroup;
    const bold = {
      fontWeight: "bold"
    };
    return (
      <div className="card green darken-1">
        <div className="card-content white-text">
          <span className="card-title" style={bold}>
            {group.GroupName}
            {(this.state.unreadMessages.length > 0 &&
              <span className="new badge">{this.state.unreadMessages.length}</span>
            )}
            <hr />
          </span>
        </div>


        {(group.Messages.length > 0) ?
          <div className="container">
            <div className="collection">
              {group.Messages.slice(group.Messages.length - 2,).map((message, i) => {
                  return (
                    <div key={i} className="container">
                      <div key={i} className="collection-item avatar green darken-1">
                        <i className="material-icons circle white-text darken-1">message</i>
                        <p className="title white-text">{message.content}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div> :
          <div className="container boardMessage">
            <div className="collection">
              <div className="collection-item avatar green darken-1">
                <i className="material-icons circle">message</i>
              </div>
            </div>
          </div>
        }
        <div className="card-action">
          <span className="white-text click" style={bold} onClick={this.gotoGroup}>
            GOTO GROUP
          </span>
        </div>
      </div>
    )
  }
}

/*
* Validation of the components properties
*/
Group.propTypes = {
  showGroup: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.MyApp
  }
);

export default connect(
  mapStateToProps, 
  {
    loadCurrentGroup 
  }
) (withRouter(Group));
