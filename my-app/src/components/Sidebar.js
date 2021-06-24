import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Computer from '@material-ui/icons/Computer';
import LocationCity from '@material-ui/icons/LocationCity'
import AccountBalance from '@material-ui/icons/AccountBalance';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SearchIcon from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PageviewIcon from '@material-ui/icons/Pageview';
import UpdateIcon from '@material-ui/icons/Update';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AppsIcon from '@material-ui/icons/Apps';
import { closeSidebar } from '../actions/uiActions';
import { adminLogout } from '../actions/adminActions';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom'
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
    constructor(props) {
        super(props);
    }

    generateListItem = (text, Icon, onClickFunction, link) => {
        let selected = false;
        if (window.location.pathname == link) {
            link = null;
            selected = true;
        }

        return (
            <ListItem button key={text} component={Link} to={link} selected={selected}
                disabled={onClickFunction == this.sideBarItemClickedEvent && !link} onClick={onClickFunction}>
                <ListItemIcon> <Icon /> </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        )
    }

    sideBarItemClickedEvent = () => {
        this.props.closeSidebar();
    }

    adminLogoutFunction = () => {
        this.sideBarItemClickedEvent();
        this.props.adminLogout(this.props);
    }

    render() {
        const isLoginPage = window.location.pathname == "/login";
        const isContractLoaded = this.props.contract.isContractLoaded;
        const networkText = isContractLoaded ? "Connected to network" : "Connect to network";
        const { classes } = this.props;
        const { admin, election } = this.props;
        const list = () => (
            <div className={classes.list} role="presentation">
                <List>
                    {
                        [
                            this.generateListItem(`Election ${election.electionStatus.text}`, HourglassEmptyIcon, this.sideBarItemClickedEvent, null),
                            this.generateListItem(networkText, AccountBalance, this.sideBarItemClickedEvent, null),
                        ]
                    }
                </List>
                <Divider />
                <List>
                    {
                        [
                            //Dashboard
                            this.generateListItem("Dashboard", AppsIcon, this.sideBarItemClickedEvent, '/'),
                            //Login Icon
                            !admin.isLoggedIn && !isLoginPage
                            && this.generateListItem("Login", Computer, this.sideBarItemClickedEvent, '/login'),
                            //Add Admin
                            election.electionStatus.value == constants.electionStatus.NOT_STARTED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Add admin", SupervisorAccountIcon, this.sideBarItemClickedEvent, '/addAdmin'),
                            // Add Constituency
                            election.electionStatus.value == constants.electionStatus.NOT_STARTED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Add constituency", LocationCity, this.sideBarItemClickedEvent, '/addConstituency'),
                            // Add Pollingbooth
                            election.electionStatus.value == constants.electionStatus.NOT_STARTED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Add polling booth", LocationOnIcon, this.sideBarItemClickedEvent, '/addPollingBooth'),
                            // Add Citizen
                            election.electionStatus.value == constants.electionStatus.NOT_STARTED.value
                            && admin.isLoggedIn
                            && this.generateListItem("Add citizen", PersonAdd, this.sideBarItemClickedEvent, '/addCitizen'),
                            // Add Candidate
                            election.electionStatus.value == constants.electionStatus.NOT_STARTED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Add candidate", PermContactCalendarIcon, this.sideBarItemClickedEvent, '/addCandidate'),
                            //Update election status
                            election.electionStatus.value != constants.electionStatus.COMPLETED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Update election status", UpdateIcon, this.sideBarItemClickedEvent, '/updateElectionStatus'),
                            // Cast Vote
                            election.electionStatus.value == constants.electionStatus.STARTED.value
                            && admin.isLoggedIn && admin.admin.role == constants.roles.CEC
                            && this.generateListItem("Cast Vote", HowToVoteIcon, this.sideBarItemClickedEvent, '/castVote'),
                            // Find Admin
                            this.generateListItem("Find admin", SearchIcon, this.sideBarItemClickedEvent, '/findAdmin'),
                            // Find Constituency
                            this.generateListItem("Find constituency", LocationCity, this.sideBarItemClickedEvent, '/findConstituency'),
                            // Find PollingBooth
                            this.generateListItem("Find polling booth", MyLocationIcon, this.sideBarItemClickedEvent, '/findPollingBooth'),
                            // Find citizen
                            admin.isLoggedIn
                            && this.generateListItem("Find citizen", AccountCircleIcon, this.sideBarItemClickedEvent, '/findCitizen'),
                            // Find candidate
                            this.generateListItem("Find candidate", PageviewIcon, this.sideBarItemClickedEvent, '/findCandidate'),
                            // Logout Icon
                            admin.isLoggedIn && this.generateListItem("Logout", ExitToApp, this.adminLogoutFunction),
                        ]
                    }
                </List>
            </div>
        );

        return (
            <div>
                {
                    <React.Fragment key="left">
                        <Drawer anchor="left" open={this.props.ui.sidebarOpen} onClose={this.props.closeSidebar}>
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
    admin: state.admin,
    contract: state.contract,
    election: state.election,
})

const mapActionsToProps = {
    adminLogout,
    closeSidebar
}


export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Sidebar)));
