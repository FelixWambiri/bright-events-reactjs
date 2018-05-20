import React, { Component } from 'react';
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { IconButton, TableCell } from 'material-ui';
import { connect } from 'react-redux';
import { deleteEvent, myEvents } from '../../actions/events';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import AuthService from '../../helpers/AuthService';
import { toggleDialog } from '../../actions/confirmationDialogs.actions';
import DeleteConfirmation from '../confirmation/DeleteConfirmation';
import Warning from '../Warning';

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: null,
    };
    this.Auth = new AuthService();
    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/login');
    }
    this.props.fetchMyEvents();
  }

  toggleDialog(event = null) {
    if (event !== null) {
      this.setState({ eventId: event.id });
    }
    const { toggleDialog, open } = this.props;
    toggleDialog(open);
  }
  handleClose() {
    const { toggleDialog, open } = this.props;
    toggleDialog(open);
    this.setState({ eventId: null });
  }
  handleDelete() {
    this.props.deleteEvent(this.state.eventId);
    this.handleClose();
    this.props.fetchMyEvents();
  }

  render() {
    const { events, open } = this.props;
    console.log('events down here are ', events);
    return (
      <Paper >
        <DeleteConfirmation
          handleDelete={() => this.handleDelete()}
          handleClose={() => this.handleClose()}
          open={open}
        />
        {
                    events.length > 0 ?
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell numeric>Created</TableCell>
                            <TableCell numeric>Edit</TableCell>
                            <TableCell numeric>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {events.map(event => (
                            <TableRow key={event.id}>
                              <TableCell>{event.name}</TableCell>
                              <TableCell numeric>{event.created_at}</TableCell>
                              <TableCell numeric>
                                <IconButton aria-label="Edit" component={Link} to={`/events/${event.id}/edit`}>
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell numeric>
                                <IconButton onClick={() => this.toggleDialog(event)} aria-label="Delete">
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                                    ))}
                        </TableBody>

                      </Table> :
                      <Warning message="You Don't have any event" />
                }

      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  events: state.myEvents,
  open: state.deleteOpen,
});
const mapDispatchToProps = dispatch => ({
  fetchMyEvents: () => dispatch(myEvents()),
  toggleDialog: open => dispatch(toggleDialog(open)),
  deleteEvent: id => dispatch(deleteEvent(id)),
});

MyEvents.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);

