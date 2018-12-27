import { Note } from "../model/Note";

export class NoteService {
    static apiUrl = "http://localhost:3001/api";

    static getAll() {
        const headers = new Headers;
        headers.append('user', localStorage.getItem('user') as string);
        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        return fetch(`${this.apiUrl}/note`, requestOptions).then(this.handleResponse);
    }

    static add(note: Note) {
        const headers = new Headers;
        headers.append('user', localStorage.getItem('user') as string);
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(note)
        };
    
        return fetch(`${this.apiUrl}/note/`, requestOptions).then(this.handleResponse);
    }

    static update(note: Note) {
        const headers = new Headers;
        headers.append('user', localStorage.getItem('user') as string);
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(note)
        };
    
        return fetch(`${this.apiUrl}/note/`, requestOptions).then(this.handleResponse);;
    }

    static _delete(id: string) {
        const requestOptions = {
            method: 'DELETE',
            // headers: authHeader()
        };
    
        return fetch(`${this.apiUrl}/note/${id}`, requestOptions).then(this.handleResponse);
    }

    static handleResponse(response: Response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    // logout();
                    location.reload(true);
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    }
}