import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGroups, createNewGroup } from '../../../actions/groupsActions';
import { reloadUserIn } from '../../../actions/authActions';
import CreateGroup from './creategroup';
import Groups from './groups';
import NewGroup from './newgroup';


/**
 * @class DashBoard
 * @extends {React.Component}
 */
class DashBoard extends React.Component {

  /**
   * Creates an instance of DashBoard.
   * @param {any} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false,
      groups: this.props.groups,
      isLoggedIn: this.props.auth.isLoggedIn
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
  }


  /**
   * @memberof DashBoard
   * @return {void}
   */
  componentDidMount() {
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/signin');
    }
    this.props.loadGroups();
  }


  /**
   * @param {any} nextProps
   * @memberof DashBoard
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.groups,
      isLoggedIn: nextProps.auth.isLoggedIn
    });
  }


  /**
   * creates a new group
   * @param {any} groupName name of group to be created
   * @memberof DashBoard
   * @return {void}
   */
  onCreateGroup(groupName) {
    this.props.createNewGroup(groupName).then(() => this.props.loadGroups());
  }

  /**
   * toggle state that handles condition
   * rendering or creating a group
   * @memberof DashBoard
   * @return {void}
   */
  toggleCreateGroup() {
    this.setState({
      createGroup: !this.state.createGroup
    });
  }


  /**
   * @memberof DashBoard
   * @return {void}
   */
  render() {
    return (
      <div className="container mainBody">
        <CreateGroup toggleCreateGroup={this.toggleCreateGroup} />
        <NewGroup
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
          onCreateGroup={this.onCreateGroup}
        />
        <Groups groups={this.state.groups} />
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
DashBoard.propTypes = {
  loadGroups: PropTypes.func.isRequired,
  createNewGroup: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth,
    groups: state.Groups
  }
);

export default connect(
  mapStateToProps,
  { loadGroups, createNewGroup, reloadUserIn }
)(DashBoard);
