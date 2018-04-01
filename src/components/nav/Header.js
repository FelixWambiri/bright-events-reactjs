import {
    AppBar, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography,
    withStyles
} from "material-ui";
import Fade from 'material-ui/transitions/Fade';
import AccountCircle from "material-ui-icons/AccountCircle"
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import headerStyles from "./styles"
import {toggleDrawer} from "../../actions/drawer";
import SideNav from "./SideNav";
import {Link} from "react-router-dom";
import logo from "./../../assets/img/andlogo.png"
import {toggleMenu} from "../../actions/bar_menu";
import AuthService from "../../helpers/AuthService";

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this)
        this.Auth = new AuthService()
    }

    toggleMenu(element=null){
        this.props.dispatch(toggleMenu(this.props.menuOpen,element?element.target:element))
    }
    render() {
        const {classes,dispatch,open,menuOpen,element} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton className="" color="inherit" aria-label="Menu" onClick={()=>dispatch(toggleDrawer(open))} >
                            <img src={logo} alt="" style={{width:30}}/>
                        </IconButton>

                        <Typography variant="title" className={classes.title}>
                            Bright Events
                        </Typography>

                        <IconButton
                            aria-owns={element ? 'fade-menu' : null}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={element=>this.toggleMenu(element)}
                        >
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={()=>dispatch(toggleDrawer(open))}>
                    <div
                        tabIndex={2}
                        role="button"
                        onClick={()=>dispatch(toggleDrawer(open))}
                        onKeyDown={()=>dispatch(toggleDrawer(open))}
                    >
                        <SideNav/>
                    </div>
                </Drawer>

                <Menu
                    id="fade-menu"
                    anchorEl={element}
                    open={Boolean(element)}
                    onClose={el=>this.toggleMenu(menuOpen,el)}
                    transition={Fade}
                >
                    {
                        (!this.Auth.loggedIn()) &&
                        <Link to='/login'><MenuItem onClick={()=>this.toggleMenu()}>Login</MenuItem></Link>
                    }
                    {
                        (this.Auth.loggedIn() &&
                                <div>
                                    <Link to='/dashboard'><MenuItem onClick={()=>this.toggleMenu()}>Dashboard</MenuItem></Link>
                                    <Link to='/'><MenuItem onClick={()=>this.Auth.logout()}>Logout</MenuItem></Link>
                                </div>
                        )
                    }


                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    open:state.drawerOpen,
    menuOpen:state.menuOpen.open,
    element:state.menuOpen.element
});
Header.propTypes = {
    classes:PropTypes.object.isRequired,
    open:PropTypes.bool.isRequired,
    menuOpen:PropTypes.bool.isRequired
};
Header.defaultProps = {
    open:false,
    menuOpen:false
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default withStyles(headerStyles)(HeaderContainer)
