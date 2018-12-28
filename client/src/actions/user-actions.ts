import { UserService } from '../services/user-service';
import { User } from '../model/User';
import { ACTIONS } from "../constants/action-types";

export function login(payload: User, callback ?: Function) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.LOGIN_REQUEST });
        UserService.login(payload)
            .then(result => {
                localStorage.setItem('user', result.token);
                dispatch(loggedIn())
                if (callback) {
                    callback();
                }
            })
            .catch( err => dispatch(authFailure()));
    }
}

export function loggedIn() {
    return { type: ACTIONS.LOGGED_IN };
}

export function logout() {
    localStorage.setItem('user', '');
    return { type: ACTIONS.LOGGED_OUT };
}

export function register(payload: User) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.REGISTER_REQUEST });
        UserService.register(payload)
            .then(result => {
                // localStorage.setItem('user', result.token);
                dispatch(registered());
            })
            .catch( err => dispatch(authFailure()));
    }
}

export function registered() {
    return { type: ACTIONS.REGISTERED };
}
export function authFailure() {
    return { type: ACTIONS.AUTH_FAILURE };
}

