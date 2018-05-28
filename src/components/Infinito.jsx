import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Infinito extends Component {
  constructor(props) {
    super(props);
    this.displayItems = this.displayItems.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);

    this.state = {
      items: 50,
      loading: false,
    };
  }

  didScroll(){
        console.log("we scrolled")
  }


  componentDidMount() {
    this.refs.scroller.addEventListener('scroll', () => {
        console.log("the scroll is ", this.refs.scroller.clientHeight)
      if (this.refs.scroller.scrollTop + this.refs.scroller.clientHeight >= this.refs.scroller.scrollHeight) {
        this.loadMoreItems();
      }
    });
  }

  loadMoreItems() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 10, loading: false });
    }, 3000);
  }

  displayItems() {
    const items = [];
    for (let i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items
  }

  render() {
    return (
      <div
          style={{ height: "420px", overflow: "auto" }}
          ref="scroller" onScroll={()=>console.log("we've sc'allrolled ")}>
        <ul>
          {this.displayItems()}
        </ul>
      </div>
    );
  }
}

Infinito.propTypes = {};

export default Infinito;
