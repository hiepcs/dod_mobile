import {loginWatcher, logoutWatcher} from "./userSaga";
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
    ])
    // code after all-effect
}