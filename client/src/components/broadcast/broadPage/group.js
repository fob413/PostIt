import React, {PropTypes} from 'react';
import Message from '../messagePage/message';

class Group extends React.Component{
  constructor(props) {
    super(props);
    this.gotoGroup = this.gotoGroup.bind(this);
  }

  gotoGroup(e) {
    e.preventDefault();
    this.props.toggleMessageBoard(this.props.showGroup.id);
  }
  render() {
    const group = this.props.showGroup;
    const bold = {
      fontWeight: "bold"
    };
    return(
      <div className="card green darken-1">
        <div className="card-content white-text">
          <span className="card-title" style={bold}>{group.GroupName}</span>
        </div>
        {group.Messages.map((message, i) => {
          return (
            <div key={i}>
              <Message
                messageContent={message.content}
                messageAuthor={message.authorsName}
              />
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
  showGroup: PropTypes.object.isRequired,
  toggleMessageBoard: PropTypes.func.isRequired
};

export default Group;
