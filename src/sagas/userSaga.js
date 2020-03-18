import * as SecureStore from 'expo-secure-store';
import {loginSuccess} from "../actions";
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {LOGIN_FAILED, LOGIN_REQUESTED, LOGOUT_FAILED, LOGOUT_REQUESTED, LOGOUT_SUCCESS} from "../actions/types";
import {loginApi} from "../utils/API";

function* loginWorker(action) {
    try{
        // const response = yield call(fetchUserApi, 1000);
        const user = yield call(loginApi, action.payload);
        yield put(loginSuccess(user));
    } catch (e) {
        console.log("Error: " + e);
        yield put({type: LOGIN_FAILED, payload: e});
    }
}

function* logoutWorker(action){
    try{
        yield put({type: LOGOUT_SUCCESS});
    } catch (e) {
        yield put({type: LOGOUT_FAILED});
    }
}

export function* loginWatcher() {
    yield takeEvery(LOGIN_REQUESTED, loginWorker);
}

export function* logoutWatcher() {
    yield takeEvery(LOGOUT_REQUESTED, logoutWorker);
}