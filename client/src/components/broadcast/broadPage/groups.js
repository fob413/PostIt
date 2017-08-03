import React, {PropTypes} from 'react';
import Group from './group';

class Groups extends React.Component {
  render() {
    if (this.props.groupList) {
      return(
        <div>
          {this.props.groupList.map((group, i) => {
            return (
              <div className="row" key={i}>
                <div className="col s12 m12">
                  <Group showGroup={group}/>
                </div>
              </div>
            )
          })}
        </div>
      );
    } else {
      return(
        <div>
          <p>CREATE YOUR FIRST GROUP</p>
        </div>
      );
    }
  }
}

/*
* Validation of the components properties
*/
Groups.propTypes = {
  groupList: PropTypes.array
};

export default Groups;
