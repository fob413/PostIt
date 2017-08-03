import React, {PropTypes} from 'react';
import Group from './group';

{/* <div>
          {this.props.groupList.map((group, i) => {
            return (
              <div className="row">
                <div className="col s12 m12">
                  <Group showGroup={group}/>
                </div>
              </div>
            )
          })}
        </div> */}

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
          {console.log(this.props.groupList)}
        </div>
      )
    }
  }
}

Groups.propTypes = {
  groupList: PropTypes.array
};

export default Groups;
