import React, { PropTypes } from 'react';


/**
 * @class SearchGroups
 * @extends {React.Component}
 */
class SearchGroups extends React.Component {

  /**
   * Creates an instance of SearchGroups.
   * @param {any} props
   * @memberof SearchGroups
   */
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.searchGroups = this.searchGroups.bind(this);
  }


  /**
   * send the current search value
   * @memberof SearchGroups
   * @return {void}
   */
  searchGroups() {
    const { _searchValue } = this.refs;
    this.props.onSearchGroups(_searchValue.value);
  }

  /**
   * @memberof SearchGroups
   * @return {void}
   */
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

SearchGroups.propTypes = {
  onSearchGroups: PropTypes.func.isRequired
};

export default SearchGroups;
