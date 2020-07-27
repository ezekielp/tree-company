import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppContainer } from '../client/AppContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { render } from 'react-dom';
import { client } from './client';

// const stripeApiKey = process.env.STRIPE_PUBLISHABLE_API_KEY;
const stripeApiKey = process.env.STRIPE_PUBLISHABLE_API_KEY_TEST;
const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

const RootApp = () => {
    return (
			<ApolloProvider client={client()}>
				<Router>
					{stripePromise ? (
						<Elements stripe={stripePromise}>
							<AppContainer />
						</Elements>
					) : (
						<AppContainer />
					)}
				</Router>
			</ApolloProvider>
		);
};

render(<RootApp />, document.querySelector('#root'));
