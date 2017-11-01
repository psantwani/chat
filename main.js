import Expo from 'expo';
import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './reducers';
import App from './app';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class Chat extends Component{
    render(){
        return(
            <Provider store={store}>                
                <App />                
            </Provider>
        );
    }
}

Expo.registerRootComponent(Chat);