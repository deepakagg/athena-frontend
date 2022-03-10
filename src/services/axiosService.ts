import axios from "axios";

const http = axios.create({
    baseURL: 'http://athena.localhost:8000',
    headers: {
        'Content-type': 'application/json',
    }
});

class AxiosService {
    private static _instance: AxiosService;
    private _authToken!: string | undefined;
    private _refreshToken!: string | undefined;
    private _config!: any;
    private constructor() { }

    public setAuthToken(authToken: string) {
        this._authToken = authToken;
        this._config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }
    }

    public deleteAuthToken(){
        this._authToken = undefined;
    }

    public getAuthToken() {
        return this._authToken;
    }

    public setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
    }

    public deleteRefreshToken() {
        this._refreshToken = undefined;
    }

    public getRefreshToken() {
        return this._refreshToken;
    }

    public async get(route: string) {
        const response = await http.get(route, this._config);
        return response;
    }

    public async post(route: string, data: any) {
        const response = await http.post(route, data, this._config);
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