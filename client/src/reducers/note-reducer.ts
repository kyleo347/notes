import { Action } from './../model/Action';
import { ACTIONS } from "../constants/action-types";
import { Reducer } from 'redux';
import { Note } from '../model/Note';
import { NoteState } from '../model/AppState';

let notes: Note[] = [];
let initialState = {
    data: notes,
    selected: undefined,
};

export const noteReducer: Reducer =  (state: NoteState = initialState, action: Action) => {
    if (action.type === ACTIONS.ADD_NOTE) {
        return {...state, 
            data: state.data.concat([action.payload]),
            selected: action.payload
        };
    }
    if (action.type === ACTIONS.DELETE_NOTE) {
        return {...state,
            data: state.data.filter((note: Note) => note._id !== action.payload)
        };
    }
    if (action.type === ACTIONS.EDIT_NOTE || action.type === ACTIONS.UPDATE_NOTE) {
        let newNotes = state.data.slice();
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === action.payload._id) {
                newNotes[i] = {...action.payload};
                break;
            }            
        }
        return {...state,
            data: newNotes,
            selected: action.payload
        }
    }
    if (action.type === ACTIONS.SELECT_NOTE) {
        return {...state,
            selected: action.payload
        }
    }
    if (action.type === ACTIONS.GET_NOTES) {
        return {...state,
            data: action.payload
        };
    }
    return state;
};
