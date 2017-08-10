import React, {PropTypes} from 'react';

class NewGroup extends React.Component {
  constructor(props){
    super(props);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onCancelCreate = this.onCancelCreate.bind(this);
  }

  onCreateGroup(e) {
    e.preventDefault();
    alert('lets create a new group');
  }

  onCancelCreate(e) {
    e.preventDefault();
    this.props.toggleCreateGroup(); 
  }

  render() {
    const {createGroup, toggleCreateGroup} = this.props;
    return (
      <div className={`row ${createGroup ? 'show' : 'hide'}`}>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input 
                className="validate"
                id="group-name"
                type="text"
              />
              <label htmlFor="group-name" >Group Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input 
                className="validate"
                id="group-description"
                type="text"
              />
              <label htmlFor="group-name" >Group Description</label>
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
