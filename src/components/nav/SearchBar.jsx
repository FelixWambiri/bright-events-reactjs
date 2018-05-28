import React, { Component } from 'react';
import { Button, Grid, Header, Input, Search, Select } from 'semantic-ui-react';
import _, { debounce } from 'lodash';

let queryInput;
let criteriaInput;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.doSearching = this.doSearching.bind(this);
    this.searchDebounced = debounce(this.doSearching, 400);
  }
  handleSearch(e) {
    const query = e.target.value;
    if (query && query.length > 0) {
      this.searchDebounced(query);
    }
    if (query === 0) {
      this.props.fetchEvents();
    }
    // e.preventDefault();
    // const { value } = e.target;
    // const { searchEvent } = this.props;
    // searchEvent(value);
  }
  doSearching(query) {
    const { searchEvent } = this.props;
    searchEvent(query);
  }
  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12 ">
        <form>
          <Input fluid  icon="search" placeholder="Search..." style={{ height: 52, marginBottom: 12 }} onChange={this.handleSearch} />
        </form>
      </div>

    );
  }
}

SearchBar.propTypes = {};

export default SearchBar;
