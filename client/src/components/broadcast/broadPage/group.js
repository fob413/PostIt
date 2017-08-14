import React, {PropTypes} from 'react';

class Group extends React.Component{
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
  }

  test(e) {
    e.preventDefault();
    this.props.toggleMessageBoard();
  }
  render() {
    const group = this.props.showGroup;
    const bold = {
      fontWeight: "bold"
    };

    return(
      <div className="card green darken-1">
        <div className="card-content white-text">
          <span className="card-title" style={bold}>{group.GroupName}</span>
        </div>
        <div className="card-action">
          <span onClick={this.test} className="white-text click" style={bold}>GO TO GROUP</span>
        </div>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Group.propTypes = {
  showGroup: PropTypes.object.isRequired,
  toggleMessageBoard: PropTypes.func.isRequired
};

export default Group;
