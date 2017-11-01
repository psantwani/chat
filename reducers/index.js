import { React } from "react";
import { combineReducers } from 'redux';

export default combineReducers({
    temp: (state) => { return state || {} }
});