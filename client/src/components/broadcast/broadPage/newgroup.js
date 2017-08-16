import React, {PropTypes} from 'react';

class NewGroup extends React.Component {
  constructor(props){
    super(props);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onCancelCreate = this.onCancelCreate.bind(this);
  }

  onCreateGroup(e) {
    const {_groupName} = this.refs;
    e.preventDefault();
    let groupname = _groupName.value.trim();
    if(groupname && groupname.length > 0) {
      this.props.toggleCreateGroup();
      this.props.onCreateGroup(groupname);
      _groupName.value = '';
    } else {
      console.log('Group name should not be empty');
    }
    
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
        <form className="col s12" onSubmit={this.onCreateGroup}>
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
  toggleCreateGroup: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired
};

export default NewGroup;
