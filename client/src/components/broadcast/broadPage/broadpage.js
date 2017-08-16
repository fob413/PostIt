import React, {PropTypes} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadGroups, createNewGroup } from '../../../actions/groupsActions';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';
import Groups from './groups';
import NewGroup from './newgroup';

class BroadPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false,
      Groups: this.props.groups
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
  }

  componentWillMount() {
    if(!localStorage.getItem('x-auth')){
      this.props.history.push('/');
    }else{
      this.props.loadGroups();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Groups: nextProps
    });
  }

  onCreateGroup(groupname){
    this.props.createNewGroup(groupname).then((res) => {
      if (res) {
        this.props.loadGroups();
      }
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
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
          onCreateGroup={this.onCreateGroup}
        />
        <SearchGroups />
        <Groups groups={this.state.Groups}/>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
};

const mapStateToProps = state => (
  {
    groups: state.Groups
  }
);

export default connect(
  mapStateToProps,
  { loadGroups, createNewGroup }
)(BroadPage);
