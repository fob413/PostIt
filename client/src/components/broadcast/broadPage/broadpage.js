import React, {PropTypes} from 'react';
import axios from 'axios';
import {groupList} from '../../../actions';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';
import Groups from './groups';
import NewGroup from './newgroup';

class BroadPage extends React.Component{
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      createGroup: false,
      groups: []
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
  }

  componentWillMount() {
    this.props.loadGroupList();
  }

  loadMessages(groupId) {
     const config = {
      headers: {'x-auth': this.store.getState().token}
    };

    axios.get(`api/group/${groupId}/messages`, config)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      alert(`${err.message} Please try again later!`);
    });
  }

  createNewGroup(GroupName) {
    const config = {
      headers: {'x-auth': this.store.getState().token}
    };

    axios.post('api/group', {
      GroupName
    }, config)
    .then(res => {
      this.loadGroupList();
    })
    .catch(err => {
      alert(`An error has occured while creating Group ${err}`);
    });
  }

  toggleCreateGroup(){
    const {createGroup} = this.state;
    if (this.state.createGroup == true) {
      this.setState({
        createGroup: false
      });
    } else {
      this.setState({
        createGroup: true
      });
    }
  }

  render() {
    return (
      <div className="container">
        <CreateGroup toggleCreateGroup={this.toggleCreateGroup} />
        <NewGroup
          createNewGroup={this.props.createNewGroup}
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
        />
        <SearchGroups />
        <Groups
          store={this.store}
          groups={this.store.getState().groups}
          toggleMessageBoard={this.props.toggleMessageBoard}
          loadMessages={this.loadMessages}
        />
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
  store: PropTypes.object.isRequired,
  toggleMessageBoard: PropTypes.func.isRequired,
  loadGroupList: PropTypes.func.isRequired,
  createNewGroup: PropTypes.func.isRequired
};

export default BroadPage;