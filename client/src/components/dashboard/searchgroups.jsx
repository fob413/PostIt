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
      search: '',
      showSearchGroups: this.props.showSearchGroups
    };

    this.searchGroups = this.searchGroups.bind(this);
  }


  /**
   * @param {any} nextProps
   * @memberof SearchGroups
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      showSearchGroups: nextProps.showSearchGroups
    });
  }


  /**
   * send the current search value
   * @memberof SearchGroups
   * @return {void}
   */
  searchGroups() {
    const { searchValue } = this.refs;
    this.props.onSearchGroups(searchValue.value);
  }

  /**
   * @memberof SearchGroups
   * @return {void}
   */
  render() {
    return (
      this.state.showSearchGroups &&
      <div className="row">
        <div className="col s12">
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <input
              ref="searchValue"
              id="icon_prefix"
              type="text"
              onChange={this.searchGroups}
            />
            <label htmlFor="icon_prefix align-left">Search Groups</label>
          </div>
        </div>
      </div>
    );
  }
}

SearchGroups.propTypes = {
  onSearchGroups: PropTypes.func.isRequired
};

export default SearchGroups;
