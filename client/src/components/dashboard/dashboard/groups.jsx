import React, { PropTypes } from 'react';
import Group from './group';
import SearchGroups from './searchgroups';


/**
 * @class Groups
 * @extends {React.Component}
 */
class Groups extends React.Component {

  /**
   * Creates an instance of Groups.
   * @param {any} props
   * @memberof Groups
   */
  constructor(props) {
    super(props);
    this.state = {
      groups: this.props.groups,
      search: ''
    };

    this.onSearchGroups = this.onSearchGroups.bind(this);
  }


  /**
   * @param {any} nextProps
   * @memberof Groups
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.groups
    });
  }


  /**
   * filter the arrar of groups
   * @param {any} search
   * @memberof Groups
   * @return {void}
   */
  onSearchGroups(search) {
    this.setState({
      search
    });
  }


  /**
   * @memberof Groups
   * @return {void}
   */
  render() {
    return (
      <div>
        <SearchGroups onSearchGroups={this.onSearchGroups} />
        {(this.state.groups.length > 0) ?
          <div className="row">
            {this.state.groups.filter(item =>
              item.Group.groupName
              .toLowerCase()
              .startsWith(this.state.search.toLowerCase())
            )
            .map((group, i) => {
              return (
                <div key={i} >
                  <Group showGroup={group.Group} groups={this.state.groups} />
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
  groups: PropTypes.array.isRequired
};

export default Groups;
