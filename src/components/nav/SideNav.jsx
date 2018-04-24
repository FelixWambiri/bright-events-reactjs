import React, { Component } from 'react';
import LoginIcon from 'material-ui-icons/LockOpen';
import ListIcon from 'material-ui-icons/Assignment';
import EventIcon from 'material-ui-icons/Event';
import FavIcon from 'material-ui-icons/Star';
import BugIcon from 'material-ui-icons/BugReport';
import ContactsIcon from 'material-ui-icons/Contacts';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { Link } from 'react-router-dom';
import logo from './../../assets/img/andlogo.png';
import AuthService from '../../helpers/AuthService';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }
  // position: absolute;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // padding: 1rem;
  // background-color: #efefef;
  // text-align: center;
  render() {
    return (
      <div className="">
        <List component="nav">
          <ListItem >
            <ListItemText primary="Bright Events (Andela)" >
              <img src={logo} alt="" style={{ width: 30 }} />
            </ListItemText>
            <Divider />
          </ListItem>
        </List>
        <Divider />
        {
            !this.auth.loggedIn() &&
            <List >
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Recent Events" />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login/Signup" />
              </ListItem>

            </List>
          }
        {
            this.auth.loggedIn() &&
            <List >
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Recent Events" />
              </ListItem>
              <ListItem button component={Link} to="/my-events">
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="My Events" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FavIcon />
                </ListItemIcon>
                <ListItemText primary="RSVP" />
              </ListItem>
            </List>
          }
        <Divider />

        <List
          component="nav"
          style={{
 position: 'absolute', right: 0, bottom: 0, left: 0,
}}
        >
            <Divider />
          <ListItem button>
            <ListItemIcon>
              <BugIcon />
            </ListItemIcon>
            <ListItemText primary="Report A Problem" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </div>

    );
  }
}

SideNav.propTypes = {};
SideNav.defaultProps = {};

export default SideNav;
