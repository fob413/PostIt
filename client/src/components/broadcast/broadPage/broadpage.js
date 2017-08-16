import React, {PropTypes} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadGroups } from '../../../actions/groupsActions';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';
import Groups from './groups';
import NewGroup from './newgroup';

class BroadPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
  }

  componentWillMount() {
    this.props.loadGroups();
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
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
        />
        <SearchGroups />
        <Groups/>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
  createNewGroup: PropTypes.func.isRequired
};

export default connect(null, { loadGroups })(BroadPage);