import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import history from './history';
import { PrivateRoute } from './common/router';

import Home from './pages/homePage';
import AdminLogin from './pages/adminLoginPage';
import Dashboard from './pages/dashboardPage';
import AddConstituency from './pages/addConstituencyPage';
import Error from './pages/errorPage';
import HeaderComponent from './components/Header';
import SidebarComponent from './components/Sidebar';

const App = (props) => {
	return (
		<div>
			<Router history={history}>
				<HeaderComponent />
				<SidebarComponent />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={AdminLogin} />
					<PrivateRoute exact path="/dashboard" Component={Dashboard} isLoggedIn={props.auth.isLoggedIn} />
					<PrivateRoute exact path="/addConstituency" Component={AddConstituency} isLoggedIn={props.auth.isLoggedIn} />
					<Route default component={Error} />
				</Switch>
			</Router >
		</div >
	);
};

const mapStateToProps = (state) => {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
