import React, {PropTypes} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Message from '../../messagePage/message';
import { loadCurrentGroup } from '../../../actions/messageActions';

class Group extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      groupId: ''
    };
    
    this.gotoGroup = this.gotoGroup.bind(this);
  }

  gotoGroup(e) {
    e.preventDefault();
    console.log('clicked');
    this.props.loadCurrentGroup(this.props.showGroup.id);
    this.props.history.push('/messageboard');
  }
  render() {
    const group = this.props.showGroup;
    const bold = {
      fontWeight: "bold"
    };
    console.log(`from group ${group.id}`);
    return(
      <div className="card green darken-1">
        <div className="card-content white-text">
          <span className="card-title" style={bold}>{group.GroupName}</span>
        </div>
        {group.Messages.map((message, i) => {
          this.setState({
            groupId: message.groupId
          });
          return (
            <div key={i}>
              <Message
                messageContent={message.content}
                messageAuthor={message.authorsName}
              />
              {console.log(message.groupId)}
            </div>
          );
        })}
        <Message/>
        <div className="card-action">
          <span onClick={this.gotoGroup} className="white-text click" style={bold}>GO TO GROUP</span>
        </div>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Group.propTypes = {
  showGroup: PropTypes.object.isRequired
};

export default connect(null, { loadCurrentGroup }) (withRouter(Group));
