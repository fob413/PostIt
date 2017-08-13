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
      const g = res.data.members.length;
      for (let i = 0; i < g; i++ ){
        this.store.dispatch(groupList(res.data.members[i].Group));
      }
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
      this.store.dispatch(groupList(res.data.GroupName));
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
        <Groups store={this.store} />
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
  store: PropTypes.object.isRequired
};

export default BroadPage;