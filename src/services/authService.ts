import axiosService from './axiosService';

class AuthService {
    private static _instance: AuthService;
    private _loginState: boolean = false;
    private constructor() { }

    public async loginUser(email: string, password: string) {
        try {
            const response = await axiosService.post('/auth/token/', { email, password });
            if (response.data.access) {
                axiosService.setAuthToken(response.data.access);
            }
            if (response.data.refresh) {
                axiosService.setRefreshToken(response.data.refresh);
            }
            this._loginState = true;
        }
        catch (e: any) {
            this._loginState = false;
        }
        return this._loginState;
    }

    public async logoutUser() {
        axiosService.deleteAuthToken();
        axiosService.deleteRefreshToken();
        this._loginState = false;
    }

    public async refreshUserAccess() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axiosService.post('/auth/token/refresh/', { "refresh": refreshToken });
            if (response.data.access) {
                axiosService.setAuthToken(response.data.access);
            }
            this._loginState = true;
        }
        catch (e: any) {
            this._loginState = false;
        }
        return this._loginState;
    }

    public async listUsers() {
        let userList = [];
        try {
            const response = await axiosService.get('/auth/users/');
            userList = response.data.results;
        }
        catch (e: any) {
            userList = [];
        }
        return userList;
    }

    public async createUser(email: string, password: string, first_name: string, last_name: string, phone_number: string) {
        let userCreated = false;
        const data = { email, password, first_name, last_name, phone_number };
        try {
            const response = await axiosService.post('/auth/users/', data);
            if (response.data['user_type']) {
                userCreated = true;
            }
        }
        catch (e) {
            userCreated = false;
        }
        return userCreated;
    }

    public async deleteUser(userId: string) {
        let userDeleted = false;
        try {
            await axiosService.delete(`/auth/users/${userId}`);
            userDeleted = true;
        }
        catch (e) {
            userDeleted = false;
        }
        return userDeleted;
    }

    public getUserEmail() {
        return axiosService.getUserEmail();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const authService = AuthService.Instance;
export default authService;