import React, {PropTypes} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Group from './group';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Groups: this.props.groups
    };

    this.log = this.log.bind(this);
  }

  log(e){
    e.preventDefault();
    alert('something about alerting state groups');
  }

  render() {
    if (this.state.Groups.length > 0) {
      return(
        <div>
          {this.state.Groups.map((group, i) => {
            return (
              <div className="row" key={i}>
                <div className="col s12 m12">
                  <Group
                    showGroup={group.Group}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return(
        <div className="center-align">
          <h4>CREATE YOUR FIRST GROUP</h4>
        </div>
      );
    }
  }
}

/*
* Validation of the components properties
*/
Groups.propTypes = {
};

export default Groups;
