import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { toggleSidebar } from '../actions/uiActions';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
    rightTitle: {
        textAlign: "right",
        flexGrow: 1,
    }
};

class Header extends React.Component {

    render() {
        const { classes } = this.props;
        console.log(this.props.auth);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon onClick={this.props.toggleSidebar} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Block Chain Based Voting System
                        </Typography>
                        {this.props.auth.isLoggedIn && <Typography variant="h6" className={classes.rightTitle}>Hello, {this.props.auth.admin.name}</Typography>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapActionsToProps = {
    toggleSidebar,
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Header));

