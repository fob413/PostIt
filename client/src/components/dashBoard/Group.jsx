import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCurrentGroup } from '../../actions/messageActions';


/**
 * @class Group
 * @extends {React.Component}
 */
export class Group extends React.Component {

  /**
   * Creates an instance of Group.
   * @param {any} props
   * @memberof Group
   */
  constructor(props) {
    super(props);

    this.state = {
      groupId: '',
      unreadMessages: [],
      userId: this.props.auth.userId,
      group: ''
    };

    this.openGroup = this.openGroup.bind(this);
  }


  /**
   * @param {any} nextProps
   * @memberof Group
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      group: nextProps.showGroup
    });
  }


  /**
   * function to open messageboard for group
   * @param {any} event click event
   * @memberof Group
   * @return {void}
   */
  openGroup(event) {
    event.preventDefault();
    this.props.loadCurrentGroup(this.props.showGroup.id);
    this.props.history.push('/messageboard');
  }


  /**
   * @memberof Group
   * @return {void}
   */
  render() {
    const group = this.props.showGroup;
    return (
      <div className="col s6 m3">
        <div className="card horizontal click" onClick={this.openGroup}>
          <div className="card-stacked">
            <div className="card-content pink darken-4">
              <p className="white-text">
                <i className="white-text material-icons left yellow-text text-darken-2 small">
                  group
                </i>
                {group.groupName}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Group.propTypes = {
  auth: PropTypes.object.isRequired,
  showGroup: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.Auth
});

export default connect(mapStateToProps, { loadCurrentGroup })(withRouter(Group));
