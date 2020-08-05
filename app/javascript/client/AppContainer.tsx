import React, { SFC } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch, withRouter } from 'react-router';
import { HomeContainer } from './home/HomeContainer';
import { CartContainer } from './cart/CartContainer';
import { CheckoutContainer } from './checkout/CheckoutContainer';
import { OrderConfirmationPage } from './order_confirmation/OrderConfirmationPage';
import { ErrorPage } from './error/ErrorPage';

interface InternalAppContainerProps extends RouteComponentProps {}

const InternalAppContainer: SFC<InternalAppContainerProps> = (props) => {
    return (
			<Switch>
				<Route path="/home" component={HomeContainer} />
				<Route path="/cart" component={CartContainer} />
				<Route path="/checkout" component={CheckoutContainer} />
				<Route path="/order-confirmation" component={OrderConfirmationPage} />
				<Route exact path="/error" component={ErrorPage} />
				<Route path="*">
					<Redirect to="/home" />
				</Route>
			</Switch>
		);
}

export const AppContainer = withRouter(InternalAppContainer);
