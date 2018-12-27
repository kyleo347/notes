import { User } from './../model/User';

export class UserService {
    static apiUrl = "http://localhost:3001/api";

    
    static login(user: User) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user)
        };
    
        return fetch(`${this.apiUrl}/login/`, requestOptions)
            .then(this.handleResponse)
    }

    static register(user: User) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user)
        };
    
        return fetch(`${this.apiUrl}/register/`, requestOptions)
            .then(this.handleResponse)
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