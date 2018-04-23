import React from 'react';
import { List } from 'semantic-ui-react';
import AuthService from '../../helpers/AuthService';
import { Avatar, Divider, ListItem, ListItemText } from 'material-ui';

class EventGuests extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }

  render() {
    const { guests } = this.props;
    return (
      <div>
        <h4>Guests Attending </h4>
        <List divided verticalAlign="middle">
          <Divider />
          {
                        (guests.length > 0) ? guests.map(guest =>
                          (<ListItem key={guest.id}>
                            <Avatar className="" color="primary">
                              {guest.name.charAt(0)}
                            </Avatar>
                            <ListItemText inset primary={guest.name} />
                          </ListItem>)) :
                        <span className="ui warning message">Currently This Event Has No Subscribers</span>
                    }

        </List>
      </div>

    );
  }
}

EventGuests.propTypes = {};

export default EventGuests;
