import React, {PropTypes} from 'react';
import Group from './group';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.log = this.log.bind(this);
  }

  log(e){
    e.preventDefault();
    alert(this.state.groups);
  }

  render() {
    if (this.store.getState().groups.length > 0) {
      return(
        <div>
          {this.store.getState().groups.map((group, i) => {
            return (
              <div className="row" key={i}>
                <div className="col s12 m12">
                  <Group showGroup={group.Group}/>
                </div>
              </div>
            )
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
  groupList: PropTypes.array
};

export default Groups;
