import React, {PropTypes} from 'react';

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {toggleCreateGroup} = this.props;
    return (
      <div className="row center cGroup">
        <div>
          <img
            width="70px"
            src={require("../../../image/gIcon.png")}
            onClick={toggleCreateGroup}
          />
          <p>Create Group</p>
        </div>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  toggleCreateGroup: PropTypes.func.isRequired
};

export default CreateGroup;