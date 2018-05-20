import React, { Component } from 'react';
import { Button, Grid, Header, Input, Search, Select } from 'semantic-ui-react';
import _, { debounce } from 'lodash';

let queryInput;
let criteriaInput;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      criteria: 'search',
    };
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch(e) {
    e.preventDefault();
    const {value} = e.target
    const { searchEvent } = this.props;
    searchEvent(value);
  }
  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12 ">
        <form>
          <Input fluid type="text" placeholder="Search..."  style={{ height: 52, marginBottom: 12 }}>
            <input onChange={this.handleSearch} />
          </Input>
        </form>

      </div>

    );
  }
}

SearchBar.propTypes = {};

export default SearchBar;
