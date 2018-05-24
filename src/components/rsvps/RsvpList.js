import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, TableBody, TableCell, TableHead, TableRow } from 'material-ui';
import { Table } from 'semantic-ui-react';
import { IMAGE_BASE_URL } from '../../constants/urls';
import eventImage from '../../assets/img/bright.png';

const diffForHumans = require('human-date');


class RsvpList extends React.Component {
  componentDidMount() {
    const { fetchMyRsvps } = this.props;
    fetchMyRsvps();
  }
  static defaultImage(e) {
    e.target.src = eventImage;
  }
  render() {
    const { myRsvps } = this.props;
    return (
      <div>
        <h3 className="ui center aligned header divided">Events I'm Attending</h3>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell numeric>Happening</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myRsvps.map(event => (
              <TableRow key={event.id}>
                <TableCell> <img alt={event.name} src={event.image ? `${IMAGE_BASE_URL}${event.image}` : eventImage} onError={RsvpList.defaultImage} style={{ width: 100, height: 100 }} /></TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell numeric>{diffForHumans.relativeTime(event.start_date)}</TableCell>
              </TableRow>
                      ))}
          </TableBody>

        </Table>
      </div>
    );
  }
}

export default RsvpList;
