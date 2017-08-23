import React, {PropTypes} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Group from './group';
import SearchGroups from './searchgroups';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Groups: this.props.groups,
      search: ''
    };

    this.onSearchGroups = this.onSearchGroups.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      Groups: nextProps.groups
    });
  }

  onSearchGroups(search){
    this.setState({
      search
    });
  }

  render() {
    return (
      <div>
        <SearchGroups onSearchGroups={this.onSearchGroups} />
        {(this.state.Groups.length > 0) ?
          <div>
            {this.state.Groups.filter((item) => {
              return item.Group.GroupName.toLowerCase().startsWith(this.state.search.toLowerCase());
            })
            .map((group, i) => {
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
          </div> :
          <div className="center-align">
            <h4>CREATE YOUR FIRST GROUP</h4>
          </div>
        }
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Groups.propTypes = {
};

export default Groups;
