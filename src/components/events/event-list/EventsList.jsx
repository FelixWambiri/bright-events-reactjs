import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { Grid } from 'material-ui';

class EventsList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Grid container >
        {
                    [...events].map(event => <Event key={event.id} {...event} />)
                }
      </Grid>
    );
  }
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventsList;
