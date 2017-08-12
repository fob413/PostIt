import React, {PropTypes} from 'react';
import Group from './group';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.state = {
      groups : []
    };
    this.log = this.log.bind(this);
  }

  componentWillMount() {
    let test = this.store.getState().groups;
    this.setState({
      groups: test
    });
    console.log(this.state.groups.length);
    
  }

  log(e){
    e.preventDefault();
    alert(this.state.groups);
  }

  render() {
    if (this.state.groups.length > 0) {
      return(
        <div>
          {this.state.groups.map((group) => {
            return (
              <div className="row" key={group.id}>
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
