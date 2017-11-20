import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGroups, createNewGroup } from '../../actions/groupsActions';
import { reloadUserIn } from '../../actions/authActions';
import Groups from './Groups';
import NewGroup from './NewGroup';
import SearchGroups from './SearchGroups';


/**
 * @class DashBoard
 * @extends {React.Component}
 */
export class DashBoard extends React.Component {

  /**
   * Creates an instance of DashBoard.
   * @param {any} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false,
      showSearchGroups: false,
      groups: this.props.groups,
      isLoggedIn: this.props.auth.isLoggedIn,
      search: ''
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onSearchGroups = this.onSearchGroups.bind(this);
    this.toggleSearchGroups = this.toggleSearchGroups.bind(this);
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
   * filter the arrar of groups
   * @param {any} search
   * @memberof Groups
   * @return {void}
   */
  onSearchGroups(search) {
    this.setState({
      search
    });
  }

  /**
   * toggle state that handles condition
   * rendering or creating a group
   * @memberof DashBoard
   * @return {void}
   */
  toggleCreateGroup() {
    if (this.state.showSearchGroups) {
      this.setState({
        createGroup: !this.state.createGroup,
        showSearchGroups: !this.state.showSearchGroups
      });
    } else if (!this.state.showSearchGroups) {
      this.setState({
        createGroup: !this.state.createGroup
      });
    }
  }


  /**
   * toggle state that handles conditional
   * rendering of searchGroups component
   * @memberof DashBoard
   * @return {void}
   */
  toggleSearchGroups() {
    if (this.state.createGroup) {
      this.setState({
        showSearchGroups: !this.state.showSearchGroups,
        createGroup: !this.state.createGroup
      });
    } else if (!this.state.createGroup) {
      this.setState({
        showSearchGroups: !this.state.showSearchGroups
      });
    }
  }


  /**
   * @memberof DashBoard
   * @return {void}
   */
  render() {
    return (
      <div className="container mainBody">
        <a
          className="waves-effect waves-light btn-large right cyan darken-4 dashButtons"
          onClick={this.toggleSearchGroups}
        >
          <i className="material-icons right">
            search
          </i>
          Search Groups
        </a>
        <a
          className="waves-effect waves-light btn-large right cyan darken-4"
          onClick={this.toggleCreateGroup}
        >
          <i className="material-icons right">
            group_add
          </i>
          Create Group
        </a>
        <SearchGroups
          onSearchGroups={this.onSearchGroups}
          showSearchGroups={this.state.showSearchGroups}
        />
        <NewGroup
          toggleCreateGroup={this.toggleCreateGroup}
          createGroup={this.state.createGroup}
          onCreateGroup={this.onCreateGroup}
        />
        <Groups groups={this.state.groups} search={this.state.search} />
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
