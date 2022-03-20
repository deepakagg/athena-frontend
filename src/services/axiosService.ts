import axios from "axios";
import { API_BASE_URL } from "../configs/AppConfig";
import jwt_decode from "jwt-decode";

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});

class AxiosService {
    private static _instance: AxiosService;
    private _authToken!: string | undefined;
    private _refreshToken!: string | undefined;
    private _userEmail!: string | undefined;
    private _config!: any;
    private constructor() { }

    public setUserEmail(authToken: string) {
        const decoded: any = jwt_decode(authToken);
        this._userEmail = decoded.user;
        window.sessionStorage.setItem('userEmail', decoded.user);
    }

    public getUserEmail() {
        return this._userEmail;
    }

    public setAuthToken(authToken: string) {
        this._authToken = authToken;
        window.sessionStorage.setItem('authToken', authToken);
        this._config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }
        this.setUserEmail(authToken);
    }

    public deleteAuthToken() {
        this._authToken = undefined;
        this._config = {
            headers: {}
        }
        window.sessionStorage.removeItem('authToken')
    }

    public setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
    }

    public deleteRefreshToken() {
        this._refreshToken = undefined;
        localStorage.removeItem('refreshToken');
    }

    public async get(route: string) {
        const response = await http.get(route, this._config);
        return response;
    }

    public async post(route: string, data: any) {
        const response = await http.post(route, data, this._config);
        return response;
    }

    public async put(route: string, data: any) {
        const response = await http.put(route, data, this._config);
        return response;
    }

    public async delete(route: string) {
        const response = await http.delete(route, this._config);
        return response;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const axiosService = AxiosService.Instance;
export default axiosService;