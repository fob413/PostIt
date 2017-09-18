import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGroups, createNewGroup } from '../../../actions/groupsActions';
import { reloadUserIn } from '../../../actions/authActions';
import CreateGroup from './creategroup';
import Groups from './groups';
import NewGroup from './newgroup';


/**
 * @class BroadPage
 * @extends {React.Component}
 */
class BroadPage extends React.Component {

  /**
   * Creates an instance of BroadPage.
   * @param {any} props
   * @memberof BroadPage
   */
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


  /**
   * @memberof BroadPage
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
   * @memberof BroadPage
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      Groups: nextProps.groups,
      isLoggedIn: nextProps.auth.isLoggedIn
    });
  }


  /**
   * creates a new group
   * @param {any} groupname name of group to be created
   * @memberof BroadPage
   * @return {void}
   */
  onCreateGroup(groupname) {
    this.props.createNewGroup(groupname).then(() => this.props.loadGroups());
  }

  /**
   * toggle state that handles condition
   * rendering or creating a group
   * @memberof BroadPage
   * @return {void}
   */
  toggleCreateGroup() {
    if (this.state.createGroup === true) {
      this.setState({
        createGroup: false
      });
    } else {
      this.setState({
        createGroup: true
      });
    }
  }


  /**
   * @memberof BroadPage
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <CreateGroup toggleCreateGroup={this.toggleCreateGroup} />
        <NewGroup
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
          onCreateGroup={this.onCreateGroup}
        />
        <Groups groups={this.state.Groups} />
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
