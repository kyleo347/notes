import { ACTIONS } from "../constants/action-types";

export function handleError(error: string) { 
    console.error(error);
    
    const payload = { error: error };
    return { type: ACTIONS.ERROR, payload }; 
}
