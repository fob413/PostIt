import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Group from './Group';


/**
 * @class Groups
 * @extends {React.Component}
 */
export class Groups extends React.Component {

  /**
   * Creates an instance of Groups.
   * @param {any} props
   * @memberof Groups
   */
  constructor(props) {
    super(props);
    this.state = {
      groups: this.props.groups,
      search: this.props.search
    };
  }


  /**
   * @param {any} nextProps
   * @memberof Groups
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.groups,
      search: nextProps.search
    });
  }


  /**
   * @memberof Groups
   * @return {void}
   */
  render() {
    return (
      <div className="row groupsBody">
        <div className="col s12">
          {(this.state.groups.length > 0) ?
            <div className="row">
              {this.state.groups.filter(item =>
              item.Group.groupName
              .toLowerCase()
              .startsWith(this.state.search.toLowerCase())
            )
              .map((group) => {
                return (
                  <div key={shortid.generate()} >
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
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Groups.propTypes = {
  groups: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};

export default Groups;
