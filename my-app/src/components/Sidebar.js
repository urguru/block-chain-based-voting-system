import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Computer from '@material-ui/icons/Computer';
import LocationCity from '@material-ui/icons/LocationCity'
import AddBox from '@material-ui/icons/AddBox';
import { toggleSidebar } from '../actions/uiActions';
import { adminLogout } from '../actions/authActions';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import constants from '../common/constants';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class Sidebar extends React.Component {

    generateListItem = (text, Icon, onClickFunction, link) => {
        return (
            <ListItem button key={text} component={Link} to={link} onClick={onClickFunction}>
                <ListItemIcon> <Icon /> </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        )
    }

    adminLogoutFunction = () => {
        this.props.adminLogout();
        this.props.toggleSidebar();
    }

    render() {
        const isLoginPage = window.location.pathname == "/login";
        const { classes } = this.props;
        const list = () => (
            <div className={classes.list} role="presentation">
                <List>
                    {
                        [
                            this.props.auth.isLoggedIn && this.generateListItem("Logout", ExitToApp, this.adminLogoutFunction), null,
                            !this.props.auth.isLoggedIn && !isLoginPage && this.generateListItem("Login", Computer, null, '/login'),
                            this.generateListItem("Find Constituency", LocationCity),
                            this.props.auth.isLoggedIn && this.props.auth.admin.role == constants.roles.CEC
                            && this.generateListItem("Add Constituency", AddBox, null, '/addConstituency'),
                        ]
                    }
                </List>
            </div>
        );

        return (
            <div>
                {
                    <React.Fragment key="left">
                        <Drawer anchor="left" open={this.props.ui.sidebarOpen} onClose={this.props.toggleSidebar}>
                            {list()}
                        </Drawer>
                    </React.Fragment>
                }
            </div >
        );
    }
}


const mapStateToProps = (state) => ({
    ui: state.ui,
    auth: state.auth,
})

const mapActionsToProps = {
    toggleSidebar,
    adminLogout,
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Sidebar));
