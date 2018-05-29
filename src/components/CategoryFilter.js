import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input } from 'semantic-ui-react';

class CategoryFilter extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Dropdown text="Filter Posts" icon="filter" floating labeled button className="icon">
        <Dropdown.Menu>
          <Input icon="search" iconPosition="left" className="search" />
          <Dropdown.Divider />
          <Dropdown.Header icon="tags" content="Tag Label" />
          <Dropdown.Menu scrolling>
              {categories.map(option => <Dropdown.Item key={option.id}>{option.name}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

CategoryFilter.propTypes = {};

export default CategoryFilter;
