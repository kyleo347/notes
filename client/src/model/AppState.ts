import { Note } from './Note';

export interface AppState {
    notes: Note[];
    selected?: Note;
    authenticated: boolean;
    registered: boolean;
}