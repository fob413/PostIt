import React, {PropTypes} from 'react';
import CreateGroup from './creategroup';
import SearchGroups from './searchgroups';

class BroadPage extends React.Component{
  render() {
    return (
      <div className="container">
        <CreateGroup />
        <SearchGroups />
      </div>
    );
  }
}

export default BroadPage;