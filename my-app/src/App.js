import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles'

import history from './history';
import { PrivateRoute } from './common/router';
import { loadContract } from './actions/contractActions';
import { closeSidebar } from './actions/uiActions';

import Dashboard from './pages/dashboardPage';
import AdminLogin from './pages/adminLoginPage';

import AddConstituency from './pages/addConstituencyPage';
import AddCitizen from './pages/addCitizenPage';
import AddPollingBooth from './pages/addPollingBooth';
import AddCandidate from './pages/addCandidate';
import AddAdmin from './pages/addAdmin';
import UpdateElectionStatus from './pages/updateElectionStatusPage';

import Error from './pages/errorPage';
import HeaderComponent from './components/Header';
import SidebarComponent from './components/Sidebar';
import MainLoadingWindowComponent from './components/MainLoadingWindow';

const styles = {
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			web3: null
		}
	}

	componentDidMount() {
		this.props.closeSidebar();
		this.props.loadContract();
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				<Router history={history}>
					<MainLoadingWindowComponent />
					<HeaderComponent />
					<SidebarComponent />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/login" component={AdminLogin} />
						<PrivateRoute exact path="/addConstituency" Component={AddConstituency} isLoggedIn={this.props.admin.isLoggedIn} />
						<PrivateRoute exact path="/addCitizen" Component={AddCitizen} isLoggedIn={this.props.admin.isLoggedIn} />
						<PrivateRoute exact path="/addPollingBooth" Component={AddPollingBooth} isLoggedIn={this.props.admin.isLoggedIn} />
						<PrivateRoute exact path="/addCandidate" Component={AddCandidate} isLoggedIn={this.props.admin.isLoggedIn} />
						<PrivateRoute exact path="/addAdmin" Component={AddAdmin} isLoggedIn={this.props.admin.isLoggedIn} />
						<PrivateRoute exact path="/updateElectionStatus" Component={UpdateElectionStatus} isLoggedIn={this.props.admin.isLoggedIn} />
						<Route default component={Error} />
					</Switch>
				</Router >
			</div >
		);
	}
}

const mapStateToProps = (state) => {
	return { admin: state.admin, contract: state.contract };
}

const mapActionsToProps = {
	loadContract,
	closeSidebar
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(App));
