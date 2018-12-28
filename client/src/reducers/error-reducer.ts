import { Action } from './../model/Action';
import { ACTIONS } from "../constants/action-types";
import { Reducer } from 'redux';
import { UserState } from '../model/AppState';

export const errorReducer: Reducer = (state: String = '', action: Action) => {
    if (action.type === ACTIONS.ERROR) {
        return {
            error: action.payload
        }
    }
    return state;
}
