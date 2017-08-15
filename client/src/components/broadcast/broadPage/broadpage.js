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
  }

  componentWillMount() {
    this.props.loadGroupList();
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