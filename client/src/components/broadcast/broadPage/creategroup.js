import React, {PropTypes} from 'react';

class CreateGroup extends React.Component {
  render() {
    return (
      <div className="row center cGroup">
        <div>
          <img
            width="70px"
            src={require("../../../image/gIcon.png")}
          />
          <p>Create Group</p>
        </div>
      </div>
    );
  }
}

export default CreateGroup;