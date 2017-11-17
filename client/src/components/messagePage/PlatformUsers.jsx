import React, { PropsTypes } from 'react';
import { connect } from 'react-redux';
import { addUserToGroup, loadGroupUsers } from '../../actions/messageActions';


/**
 * @class PlatformUsers
 * @extends {React.Component}
 */
export class PlatformUsers extends React.Component {

  /**
   * Creates an instance of PlatformUsers.
   * @param {any} props
   * @memberof PlatformUsers
   */
  constructor(props) {
    super(props);
    this.state = ({
      addUserId: '',
      groupUsers: this.props.groupUsers
    });

    this.addUser = this.addUser.bind(this);
    this.isGroupMember = this.isGroupMember.bind(this);
  }


  /**
   * @param {any} nextProps
   * @memberof PlatformUsers
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groupUsers: nextProps.groupUsers
    });
  }


  /**
   * @param {any} event
   * @memberof PlatformUsers
   * @return {void}
   */
  addUser(event) {
    event.preventDefault();
    this.props.addUserToGroup(
      this.props.platformUser.id,
      this.props.Messages.groupId
    )
    .then(() => this.props.loadGroupUsers(this.props.Messages.groupId));
  }

  /**
   * check if user belongs to group or not
   * @param {any} id the users id to be checked
   * @memberof PlatformUsers
   * @return {boolean} result to signify if user belongs to group
   */
  isGroupMember(id) {
    const { groupUsers } = this.state;
    let groupMember = false;
    (groupUsers.length > 0) &&
      groupUsers.map((user) => {
        if (id === user.userId) groupMember = true;
      });

    return groupMember;
  }


  /**
   * @memberof PlatformUsers
   * @return {void}
   */
  render() {
    return (
      this.isGroupMember(this.props.platformUser.id) ?
        <li
          className="collection-item click"
        >
          {this.props.platformUser.userName}
          <a href="#!" className="secondary-content pink-text text-darken-4">
            MEMBER
          </a>
        </li> :
        <li
          className="collection-item click"
        >
          {this.props.platformUser.userName}
          <a href="#!" className="secondary-content">
            <i onClick={this.addUser} className="material-icons pink-text text-darken-4">
              group_add
            </i>
          </a>
        </li>
    );
  }
}

PlatformUsers.propTypes = {
  // platformUser: PropsTypes.object.isRequired,
  // addUserToGroup: PropsTypes.func.isRequired,
  // Messages: PropsTypes.object.isRequired,
  // loadGroupUsers: PropsTypes.func.isRequired
};

const mapStateToProps = state => ({
  Messages: state.Messages
});

export default connect(
  mapStateToProps,
  {
    addUserToGroup,
    loadGroupUsers
  }
)(PlatformUsers);
