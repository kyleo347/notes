import { Note } from "./Note";

export interface Action {
    type: string;
    payload?: any;
}