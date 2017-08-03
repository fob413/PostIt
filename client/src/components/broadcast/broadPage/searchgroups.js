import React, {PropTypes} from 'react';

class SearchGroups extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" />
          <label htmlFor="icon_prefix align-left">Search Groups</label>
        </div>
      </div>
    );
  }
}

export default SearchGroups;
