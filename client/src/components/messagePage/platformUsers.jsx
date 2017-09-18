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
   * @param {any} e
   * @memberof PlatformUsers
   * @return {void}
   */
  addUser(e) {
    e.preventDefault();
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
        {this.props.platformUser.UserName}
        <a href="#!" className="secondary-content">
          <i onClick={this.addUser} className="material-icons green-text text-darken-4">
            add
          </i>
        </a>
      </li>
    );
  }
}

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
