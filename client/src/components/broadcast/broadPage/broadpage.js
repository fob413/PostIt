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
    this.loadGroupList = this.loadGroupList.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
  }

  componentWillMount() {
    this.loadGroupList();
  }

  loadGroupList() {
    const config = {
      headers: {'x-auth': this.store.getState().token}
    };

    axios.get('api/group/list', config)
    .then(res => {
      this.store.dispatch(groupList(res.data.members));
      this.setState({
        groups: this.store.getState().groups
      });
    })
    .catch( err => {
      alert(`An error has occured while loading the groups ${err}`);
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
          createNewGroup={this.createNewGroup}
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
        />
        <SearchGroups />
        <Groups
          store={this.store}
          groups={this.state.groups}
          toggleMessageBoard={this.props.toggleMessageBoard}
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
  toggleMessageBoard: PropTypes.func.isRequired
};

export default BroadPage;