import React, {PropTypes} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadGroups, createNewGroup } from '../../../actions/groupsActions';
import { reloadUserIn } from '../../../actions/authActions';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';
import Groups from './groups';
import NewGroup from './newgroup';
import { authenticateUser } from '../../auth';

class BroadPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false,
      Groups: this.props.groups,
      isLoggedIn: this.props.auth.isLoggedIn
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
  }
  
  componentDidMount() {
    if(!this.props.auth.isLoggedIn){
      this.props.history.push('/signin');
    }
    this.props.loadGroups();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Groups: nextProps.groups,
      isLoggedIn:nextProps.auth.isLoggedIn
    });
  }

  onCreateGroup(groupname){
    this.props.createNewGroup(groupname).then(() => this.props.loadGroups());
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
        <Groups groups={this.state.Groups}/>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
  loadGroups: PropTypes.func.isRequired,
  createNewGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.MyApp,
    groups: state.Groups
  }
);

export default connect(
  mapStateToProps,
  { loadGroups, createNewGroup, reloadUserIn }
)(BroadPage);
