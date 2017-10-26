import React, { PropsTypes } from 'react';
import { connect } from 'react-redux';
import { addUserToGroup, loadGroupUsers } from '../../actions/messageActions';


/**
 * @class PlatformUsers
 * @extends {React.Component}
 */
class PlatformUsers extends React.Component {

  /**
   * Creates an instance of PlatformUsers.
   * @param {any} props
   * @memberof PlatformUsers
   */
  constructor(props) {
    super(props);
    this.state = ({
      addUserId: ''
    });

    this.addUser = this.addUser.bind(this);
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
   * @memberof PlatformUsers
   * @return {void}
   */
  render() {
    return (
      <li
        className="collection-item click"
      >
        {this.props.platformUser.userName}
        <a href="#!" className="secondary-content">
          <i onClick={this.addUser} className="material-icons green-text text-darken-4">
            add
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
