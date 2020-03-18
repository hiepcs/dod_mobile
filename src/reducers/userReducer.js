import {
    LOGIN_REQUESTED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_REQUESTED,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS
} from "../actions/types";
import {isRunningExpo, testEmail, testRole, testToken} from "../constants/config";

const initialState = isRunningExpo ? {
    email: testEmail,
    accessToken: testToken,
    role: testRole
}: {
    email: '',
    accessToken: '',
    role: '',
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return {
                ...state,
                role: 'user',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                role: action.payload.role,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                role: '',
                email: '',
                accessToken: '',
            }
        case LOGIN_FAILED:
        case LOGOUT_REQUESTED:
        case LOGOUT_FAILED:
        default:
            return state;
    }
}