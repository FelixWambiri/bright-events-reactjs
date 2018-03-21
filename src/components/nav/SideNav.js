import React, {Component} from 'react';
import FeaturedPlayList from 'material-ui-icons/FeaturedPlayList';
import { Divider, List, ListItem, ListItemIcon, ListItemText
} from "material-ui";
import {Link} from "react-router-dom";
class SideNav extends Component {
    render() {
        return (
            <div className="">
                <List component="nav">
                    <ListItem>
                        <ListItemText primary="Bright Events (Andela)"  />
                        <Divider/>
                    </ListItem>
                </List>
                <Divider />
                <List component={Link} to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <FeaturedPlayList />
                        </ListItemIcon>
                        <ListItemText  primary="Recent Events" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

SideNav.propTypes = {};
SideNav.defaultProps = {};

export default SideNav;
