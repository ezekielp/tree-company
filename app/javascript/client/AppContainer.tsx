import React, { SFC } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch, withRouter } from 'react-router';
import { HomeContainer } from './home/HomeContainer';
import { CartContainer } from './cart/CartContainer';

interface InternalAppContainerProps extends RouteComponentProps {}

const InternalAppContainer: SFC<InternalAppContainerProps> = props => {
    return (
			<Switch>
				<Route path="/home" component={HomeContainer} />
				<Route path="/cart" component={CartContainer} />
				<Route path="*">
					<Redirect to="/home" />
				</Route>
			</Switch>
		);
}

export const AppContainer = withRouter(InternalAppContainer);
