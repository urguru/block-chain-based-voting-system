import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ Component, isLoggedIn, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
        />
    );
}
