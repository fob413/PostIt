import React, {PropTypes} from 'react';

class SearchGroups extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      search: ''
    };

    this.searchGroups = this.searchGroups.bind(this);
  }

  searchGroups() {
    const { _searchValue } = this.refs;
    this.props.onSearchGroups(_searchValue.value);
  }
  render() {
    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input 
            ref="_searchValue"
            id="icon_prefix" 
            type="text" 
            onChange={this.searchGroups}
          />
          <label htmlFor="icon_prefix align-left">Search Groups</label>
        </div>
      </div>
    );
  }
}

export default SearchGroups;
