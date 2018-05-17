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
  }
  handleSearch(e) {
    e.preventDefault();
    const { searchEvent } = this.props;
    const { query, criteria } = this.state;
    searchEvent(query, criteria);
  }
  render() {
    const options = [
      { key: 'location', text: 'Location', value: 'location' },
      { key: 'search', text: 'Category', value: 'search' },
    ];

    return (
      <div className="col-md-6 offset-md-3 col-sm-12 " raised>
        <form action="" onSubmit={this.handleSearch.bind(this)}>
          <Input fluid type="text" placeholder="Search..." action style={{ height: 52, marginBottom: 12 }}>
            <input onChange={input => this.setState({ query: input.target.value })} />
            <Select
              onChange={(input, { value }) => this.setState({ criteria: value })}
              compact
              options={options}
              defaultValue="location"
            />
            <Button type="submit" >Search</Button>
          </Input>
        </form>

      </div>

    );
  }
}

SearchBar.propTypes = {};

export default SearchBar;
