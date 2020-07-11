import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { client } from './client';

const RootApp = () => {
    return (
        <ApolloProvider client={client()}>
            <Router>

            </Router>
        </ApolloProvider>
    )
};

render(<RootApp />, document.querySelector('#root'));
