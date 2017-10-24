import React, { PropTypes } from 'react';

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { toggleCreateGroup } = this.props;
    return (
      <div className="row right cGroup">
        <div>
          <a // eslint-disable-line
            onClick={toggleCreateGroup}
            className="waves-effect waves-light btn-large cyan darken-4"
          >
            <i className="material-icons right">group_add</i>
            Create Group
          </a>
        </div>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  toggleCreateGroup: PropTypes.func.isRequired
};

export default CreateGroup;
