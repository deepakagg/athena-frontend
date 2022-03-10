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

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const authService = AuthService.Instance;
export default authService;