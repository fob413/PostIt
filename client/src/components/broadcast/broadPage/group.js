import React, {PropTypes} from 'react';

class Group extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const group = this.props.showGroup;
    const bold = {
      fontWeight: "bold"
    };

    return(
      <div className="card green darken-1">
        <div className="card-content white-text">
          <span className="card-title" style={bold}>{group.groupName}</span>
        </div>
        <div className="card-action">
          <span className="white-text click" style={bold}>GO TO GROUP</span>
        </div>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Group.propTypes = {
  showGroup: PropTypes.object.isRequired
};

export default Group;
