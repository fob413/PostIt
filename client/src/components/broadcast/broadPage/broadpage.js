import React, {PropTypes} from 'react';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';
import Groups from './groups';

class BroadPage extends React.Component{
  render() {
    return (
      <div className="container">
        <CreateGroup />
        <SearchGroups />
        <Groups groupList={this.props.user.groups}/>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
BroadPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default BroadPage;