import React, {PropTypes} from 'react';

class NewGroup extends React.Component {
  constructor(props){
    super(props);
    this.createNewGroup = this.props.createNewGroup;
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onCancelCreate = this.onCancelCreate.bind(this);
  }

  onCreateGroup(e) {
    const {_groupName} = this.refs;
    e.preventDefault();
    alert('lets create a new group');
    this.createNewGroup(_groupName.value);
    this.props.toggleCreateGroup();
    _groupName.value = '';
  }

  onCancelCreate(e) {
    const {_groupName} = this.refs;
    e.preventDefault();
    this.props.toggleCreateGroup();
    _groupName.value = '';
  }

  render() {
    const {createGroup, toggleCreateGroup} = this.props;
    return (
      <div className={`row ${createGroup ? 'show' : 'hide'}`}>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input 
                ref="_groupName"
                className="validate"
                id="group-name"
                type="text"
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
                onClick={this.onCreateGroup}
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
  createGroup : PropTypes.bool.isRequired,
  toggleCreateGroup: PropTypes.func.isRequired
};

export default NewGroup;
