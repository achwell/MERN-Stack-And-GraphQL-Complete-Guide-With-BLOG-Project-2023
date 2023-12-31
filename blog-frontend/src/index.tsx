import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import {Provider} from "react-redux";
import {store} from "./store";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql/',
    cache: new InMemoryCache(),
});

root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>,
            </BrowserRouter>
        </ApolloProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
