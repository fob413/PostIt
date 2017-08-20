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
    this.props.loadCurrentGroup(this.props.showGroup.id);
    this.props.history.push('/messageboard');
  }

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
            <hr />
          </span>
        </div>

        {(group.Messages.length > 0) ?
          <div>MESSAGES HERE</div> :
          <div>MESSAGES HERE EMPTY</div>
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

export default connect(null, { loadCurrentGroup }) (withRouter(Group));
