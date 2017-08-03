import React, {PropTypes} from 'react';
import CreateGroup from './creategroup';

class BroadPage extends React.Component{
  render() {
    return (
      <div className="container">
        <CreateGroup />
      </div>
    );
  }
}

export default BroadPage;