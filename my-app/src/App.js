import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { PrivateRoute } from './common/router';
import { connectToNetwork, loadContract } from './actions/ethereumActions';

import Home from './pages/homePage';
import AdminLogin from './pages/adminLoginPage';
import Dashboard from './pages/dashboardPage';
import AddConstituency from './pages/addConstituencyPage';
import Error from './pages/errorPage';
import HeaderComponent from './components/Header';
import SidebarComponent from './components/Sidebar';
import AddCitizen from './pages/addCitizenPage';

class App extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.loadContract();
	}

	render() {
		return (
			<div>
				<Router history={history}>
					<HeaderComponent />
					<SidebarComponent />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={AdminLogin} />
						<PrivateRoute exact path="/dashboard" Component={Dashboard} isLoggedIn={this.props.auth.isLoggedIn} />
						<PrivateRoute exact path="/addConstituency" Component={AddConstituency} isLoggedIn={this.props.auth.isLoggedIn} />
						<PrivateRoute exact path="/addCitizen" Component={AddCitizen} isLoggedIn={this.props.auth.isLoggedIn} />
						<Route default component={Error} />
					</Switch>
				</Router >
			</div >
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth, ethereum: state.ethereum };
}

const mapActionsToProps = {
	loadContract
}

export default connect(mapStateToProps, mapActionsToProps)(App);
