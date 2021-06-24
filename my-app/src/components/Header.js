import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { openSidebar } from '../actions/uiActions';

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
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon onClick={this.props.openSidebar} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Block Chain Based Voting System
                        </Typography>
                        {this.props.admin.isLoggedIn && <Typography variant="h6" className={classes.rightTitle}>Hello, {this.props.admin.admin.name}</Typography>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin
})

const mapActionsToProps = {
    openSidebar
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Header));

