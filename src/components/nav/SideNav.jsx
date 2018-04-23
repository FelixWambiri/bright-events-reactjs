import React, { Component } from 'react';
import FeaturedPlayList from 'material-ui-icons/FeaturedPlayList';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { Link } from 'react-router-dom';
import logo from './../../assets/img/andlogo.png';

class SideNav extends Component {
  render() {
    return (
      <div className="">
        <List component="nav">
          <ListItem>
            <ListItemText primary="Bright Events (Andela)" >
              <img src={logo} alt="" style={{ width: 30 }} />
            </ListItemText>
            <Divider />
          </ListItem>
        </List>
        <Divider />
        <List >
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <FeaturedPlayList />
            </ListItemIcon>
            <ListItemText primary="Recent Events" />
          </ListItem>
          <ListItem button component={Link} to="/my-events">
            <ListItemIcon>
              <FeaturedPlayList />
            </ListItemIcon>
            <ListItemText primary="My Events" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeaturedPlayList />
            </ListItemIcon>
            <ListItemText primary="RSVP" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeaturedPlayList />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" style={{ marginBottom: 0 }}>
          <ListItem>
            <ListItemText primary="Bright Events (Andela)" >
              <img src={logo} alt="" style={{ width: 30 }} />
            </ListItemText>
            <Divider />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}

SideNav.propTypes = {};
SideNav.defaultProps = {};

export default SideNav;
