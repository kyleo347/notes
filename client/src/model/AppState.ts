import { Note } from './Note';

export interface NoteState {
    data: Note[];
    selected?: Note;
}

export interface UserState {
    authenticated: boolean;
    registered: boolean;
}

export interface AppState {
    notes: NoteState;
    user: UserState;
    error: string;
}

