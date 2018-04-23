import { AppBar, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography } from 'material-ui';
import Fade from 'material-ui/transitions/Fade';
import AccountCircle from 'material-ui-icons/AccountCircle';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions/theme.picker.actions';
import { toggleDrawer } from '../../actions/drawer';
import SideNav from './SideNav';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../../actions/barMenu';
import MenuIcon from 'material-ui-icons/Menu';
import AuthService from '../../helpers/AuthService';
import ThemePickerService from '../../helpers/ThemePickerService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.Auth = new AuthService();
    this.themeService = new ThemePickerService();
  }


  componentWillMount() {
    this.props.dispatch(changeTheme(this.themeService.getCurrent()));
  }

  toggleMenu(element = null) {
    this.props.dispatch(toggleMenu(this.props.menuOpen, element ? element.target : element));
  }
  render() {
    const {
      theme, dispatch, open, menuOpen, element,
    } = this.props;
    return (
      <div style={theme.root}>
        <AppBar position="static" style={theme.style.appBar}>
          <Toolbar>
            <IconButton className="" color="inherit" aria-label="Menu" onClick={() => dispatch(toggleDrawer(open))} >
              <MenuIcon />
            </IconButton>

            <Typography variant="title" style={theme.title}>
                            Bright Events
            </Typography>

            <IconButton
              aria-owns={element ? 'fade-menu' : null}
              aria-haspopup="true"
              color="inherit"
              onClick={element => this.toggleMenu(element)}
            >
              <AccountCircle />
            </IconButton>

          </Toolbar>
        </AppBar>

        <Drawer open={open} onClose={() => dispatch(toggleDrawer(open))}>
          <div
            tabIndex={2}
            role="button"
            onClick={() => dispatch(toggleDrawer(open))}
            onKeyDown={() => dispatch(toggleDrawer(open))}
          >
            <SideNav />
          </div>
        </Drawer>

        <Menu
          id="fade-menu"
          anchorEl={element}
          open={Boolean(element)}
          onClose={el => this.toggleMenu(menuOpen, el)}
          transition={Fade}
        >
          {
                        (!this.Auth.loggedIn()) &&
                        <Link to="/login"><MenuItem onClick={() => this.toggleMenu()}>Login</MenuItem></Link>
                    }
          {
                        (this.Auth.loggedIn() &&
                        <div>
                          <Link to="/dashboard"><MenuItem onClick={() => this.toggleMenu()}>Dashboard</MenuItem></Link>
                          <Link to="/"><MenuItem onClick={() => {
                                        this.toggleMenu();
                                        this.Auth.logout();
                                        this.props.dispatch(changeTheme(this.themeService.getCurrent()));
                                    }}
                          >Logout
                          </MenuItem>
                          </Link>
                        </div>
                        )
                    }


        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.drawerOpen,
  menuOpen: state.menuOpen.open,
  element: state.menuOpen.element,
  theme: state.theme,
});

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  open: false,
  menuOpen: false,
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
