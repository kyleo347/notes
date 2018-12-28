import { NoteService } from '../services/note-service';
import { Action } from '../model/Action';
import { ACTIONS } from "../constants/action-types";
import { Note } from "../model/Note";
import { handleError } from "./error-actions";


export function getAllNotes() {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.GET_NOTES_REQUEST });
        const token = localStorage.getItem('user');
        NoteService.getAll()
            .then(response => dispatch(allNotesGotten(response.notes)), error => dispatch(handleError(error.toString())));
    };
}
export function allNotesGotten(payload: Note[]): Action {
    return { type: ACTIONS.GET_NOTES, payload };
}
export function addNote(payload: Note) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.ADD_NOTE_REQUEST });
        NoteService.add(payload)
            .then(res => {
                if (res.success) {
                    dispatch(noteAdded(res.note));
                } else {
                    dispatch(handleError(res.error))
                }
            }, error => {
                dispatch(handleError(error.toString()));
            });
    };
}
;
export function noteAdded(payload: Note): Action {
    return { type: ACTIONS.ADD_NOTE, payload };
}
export function editNote(payload: Note) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.UPDATE_NOTE_REQUEST });
        NoteService.update(payload)
            .then(res => {
                if (res.success) {
                    dispatch(noteEdited(res.note));
                } else {
                    dispatch(handleError(res.error))
                }
            }, error => {
                dispatch(handleError(error.toString()));
            });
    };
}
export function noteEdited(payload: Note): Action {
    return { type: ACTIONS.UPDATE_NOTE, payload };
}
;
export function deleteNote(payload: string) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.DELETE_NOTE_REQUEST });
        NoteService._delete(payload)
            .then(
                res => {
                    dispatch(noteDeleted(payload));
                }, 
                error => dispatch(handleError(error.toString())));
    };
}
export function noteDeleted(payload: string): Action {
    return { type: ACTIONS.DELETE_NOTE, payload };
}
;
export function selectNote(payload: Note): Action {
    return { type: ACTIONS.SELECT_NOTE, payload };
}
;
