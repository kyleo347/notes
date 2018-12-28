import { Action } from './../model/Action';
import { ACTIONS } from "../constants/action-types";
import { Reducer } from 'redux';
import { UserState } from '../model/AppState';

let initialState = {
    authenticated: false,
    registered: false
};

export const userReducer: Reducer = (state: UserState = initialState, action: Action) => {
    if (action.type === ACTIONS.REGISTERED) {
        return {...state,
            registered: true
        }
    }
    if (action.type === ACTIONS.LOGGED_IN) {
        return {...state,
            authenticated: true
        }
    }
    if (action.type === ACTIONS.LOGGED_OUT) {
        return {...state,
            authenticated: false
        }
    }
    return state;
}
