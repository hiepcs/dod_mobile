import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import statReducer from "./statReducer";

export default combineReducers({
    user: userReducer,
    loading: loadingReducer,
    stat: statReducer,
});