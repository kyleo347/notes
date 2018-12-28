import { combineReducers } from 'redux';
import { noteReducer as notes } from './note-reducer';
import { userReducer as user } from './user-reducer';
import { errorReducer as error } from './error-reducer';

const rootReducer = combineReducers({
    notes, 
    user,
    error
});

export default rootReducer;