import {LOGIN_REQUESTED, LOGIN_SUCCESS} from "./types";

export const loginRequest = (accessCode) => ({ type: LOGIN_REQUESTED, payload: accessCode })

export const loginSuccess = (user) => (
    { type: LOGIN_SUCCESS, payload: user }
)