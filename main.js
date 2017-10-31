import react, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './reducers';
import App from './app';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export default class Chat extends Component{
    render(){
        <Provider store={store}>
            <App />
        </Provider>
    }
}