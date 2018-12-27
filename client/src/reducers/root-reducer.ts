import { Action } from './../model/Action';
import { AppState } from './../model/AppState';
import { ACTIONS } from "../constants/action-types";

let initialState: AppState  = {
    notes: [],
    selected: undefined,
    authenticated: false,
    registered: false
};

function rootReducer(state = initialState, action: Action): AppState {
    if (action.type === ACTIONS.ADD_NOTE) {
        return {...state, 
            notes: state.notes.concat([action.payload]),
            selected: action.payload
        };
    }
    if (action.type === ACTIONS.DELETE_NOTE) {
        return {...state,
            notes: state.notes.filter(note => note !== action.payload)
        };
    }
    if (action.type === ACTIONS.EDIT_NOTE || action.type === ACTIONS.UPDATE_NOTE) {
        let newNotes = state.notes.slice();
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i].id === action.payload.id) {
                newNotes[i] = {...action.payload};
                break;
            }            
        }
        return {...state,
            notes: newNotes,
            selected: action.payload
        }
    }
    if (action.type === ACTIONS.SELECT_NOTE) {
        return {...state,
            selected: action.payload
        }
    }
    // if (action.type === ACTIONS.PUT_NOTE) {
    //     if (state.notes.filter(note => note.id === action.payload.id).length > 0) {
    //         return rootReducer(state, {type: ACTIONS.EDIT_NOTE, payload: action.payload})
    //     }
    //     return rootReducer(state, {type: ACTIONS.ADD_NOTE, payload: action.payload})
    // }
    if (action.type === ACTIONS.GET_NOTES) {
        return {...state,
            notes: action.payload
        };
    }
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
};

export default rootReducer;