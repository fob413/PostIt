import React, {PropTypes} from 'react';
import Group from './group';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.state = {
      groups : []
    };

    this.loadGroups = this.loadGroups.bind(this);
  }

  componentWillMount() {
    console.log(`this happens before ${this.state.groups}`);
    this.loadGroups();
    console.log(`this happens after ${this.state.groups}`);
    console.log(`>>>>>>>>>${this.store.getState()}`);
  }

  loadGroups() {
    let toLoad = [];
    toLoad = this.store.getState().groups;
    console.log(`??? ${toLoad}`);
    console.log(`???>>> ${this.store.getState().groups}`);
    console.log(this.store.getState().groups);
    this.setState({
      groups: toLoad
    });
  }

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
