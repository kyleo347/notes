import { UserService } from './../services/user-service';
import { User } from './../model/User';
import { NoteService } from './../services/note-service';
import { Action } from './../model/Action';
import { ACTIONS } from "../constants/action-types";
import { Note } from "../model/Note";

export function getAllNotes() {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.GET_NOTES_REQUEST })

        const token = localStorage.getItem('user');
        NoteService.getAll()
            .then(
                response => dispatch(allNotesGotten(response.notes)),
                error => dispatch(handleError(error.toString()))
            );
    }
}

export function allNotesGotten(payload: Note[]): Action {
    return { type: ACTIONS.GET_NOTES, payload };
}

export function addNote(payload: Note) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.ADD_NOTE_REQUEST })
        NoteService.add(payload)
            .then(
                res => {
                    dispatch(noteAdded(res.note));
                },
                error => {
                    dispatch(handleError(error.toString()))
                }
            );
    }
};

export function noteAdded(payload: Note): Action {
    return { type: ACTIONS.ADD_NOTE, payload }
}

export function editNote(payload: Note) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.UPDATE_NOTE_REQUEST })
        NoteService.update(payload)
            .then(
                res => {
                    dispatch(noteEdited(res.note));
                },
                error => {
                    dispatch(handleError(error.toString()))
                }
            );
    }
}

export function noteEdited(payload: Note): Action {
    return { type: ACTIONS.UPDATE_NOTE, payload }
};

export function deleteNote(payload: string) {
    return (dispatch: Function) => {
        dispatch({ type: ACTIONS.DELETE_NOTE_REQUEST })
        NoteService._delete(payload)
            .then(
                res => dispatch(noteDeleted(res)),
                error => dispatch(handleError(error.toString()))
            );
    }

}

export function noteDeleted(payload: Note): Action {
    return { type: ACTIONS.DELETE_NOTE, payload }
};

export function selectNote(payload: Note): Action {
    return { type: ACTIONS.SELECT_NOTE, payload }
};

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
                localStorage.setItem('user', result.data.token);
                dispatch(registered())
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

export function handleError(error: string) { return { type: ACTIONS.ERROR, error } }