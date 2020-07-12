import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppContainer } from '../client/AppContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { client } from './client';

const RootApp = () => {
    return (
        <ApolloProvider client={client()}>
            <Router>
                <AppContainer />
            </Router>
        </ApolloProvider>
    )
};

render(<RootApp />, document.querySelector('#root'));
