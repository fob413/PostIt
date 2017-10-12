import React, { PropTypes } from 'react';


/**
 * @class NewGroup
 * @extends {React.Component}
 */
class NewGroup extends React.Component {

  /**
   * Creates an instance of NewGroup.
   * @param {any} props
   * @memberof NewGroup
   */
  constructor(props) {
    super(props);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onCancelCreate = this.onCancelCreate.bind(this);
  }


  /**
   * creates a new group
   * @param {any} event
   * @memberof NewGroup
   * @return {void}
   */
  onCreateGroup(event) {
    const { _groupName } = this.refs;
    event.preventDefault();
    const groupname = _groupName.value.trim();
    if (groupname && groupname.length > 0) {
      this.props.toggleCreateGroup();
      this.props.onCreateGroup(groupname);
      _groupName.value = '';
    }
  }


  /**
   * on terminating create group
   * @param {any} event
   * @memberof NewGroup
   * @return {void}
   */
  onCancelCreate(event) {
    const { _groupName } = this.refs;
    event.preventDefault();
    this.props.toggleCreateGroup();
    _groupName.value = '';
  }


  /**
   * @memberof NewGroup
   * @return {void}
   */
  render() {
    const { createGroup, toggleCreateGroup } = this.props;
    return (
      <div className={`row ${createGroup ? 'show' : 'hide'}`}>
        <form className="col s12" onSubmit={this.onCreateGroup}>
          <div className="row">
            <div className="input-field col s12">
              <input
                ref="_groupName"
                className="validate"
                id="group-name"
                type="text"
                autoComplete="off"
              />
              <label
                htmlFor="group-name"
              >
                Group Name
              </label>
            </div>
          </div>
          <div className="row">
            <div>
              <button
                className="btn-large green darken-4 waves effect"
                type="submit"
                name="action"
                onClick={this.onCancelCreate}
              >
                Cancel
              </button>
              <button
                className="right btn-large green darken-4 waves effect"
                type="submit"
                name="action"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

NewGroup.propTypes = {
  createGroup: PropTypes.bool.isRequired,
  toggleCreateGroup: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired
};

export default NewGroup;
