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

    public async getUserById(id: string) {
        let user = undefined;
        try {
            const response = await axiosService.get(`/auth/users/${id}/`);
            user = response.data;
        }
        catch (e: any) {
            user = undefined;
        }
        return user;
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

    public async updateUser(id: string, email: string, first_name: string, last_name: string, phone_number: string, is_active: boolean) {
        let userUpdated = false;
        const data = { email, first_name, last_name, phone_number, is_active };
        try {
            const response = await axiosService.put(`/auth/users/${id}/`, data);
            if (response.data['user_type']) {
                userUpdated = true;
            }
        }
        catch (e) {
            userUpdated = false;
        }
        return userUpdated;
    }

    public async deleteUser(userId: string) {
        let userDeleted = false;
        try {
            await axiosService.delete(`/auth/users/${userId}/`);
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

    public async getUserRoles() {
        let userRolesList = [];
        try {
            const response = await axiosService.get('/auth/roles/');
            userRolesList = response.data.results;
        }
        catch (e: any) {
            userRolesList = [];
        }
        return userRolesList;
    }

    public async createUserRole(name: string, read_only: boolean, methods: Array<string>, content_type: string) {
        let userRoleCreated = false;
        const data = { name, read_only, methods, content_type };
        try {
            const response = await axiosService.post('/auth/roles/', data);
            if (response.data['id']) {
                userRoleCreated = true;
            }
        }
        catch (e) {
            userRoleCreated = false;
        }
        return userRoleCreated;
    }

    public async updateUserRole(id: string, name: string, read_only: boolean, methods: Array<string>, content_type: string) {
        let userRoleUpdated = false;
        const data = { name, read_only, methods, content_type };
        try {
            const response = await axiosService.put(`/auth/roles/${id}/`, data);
            if (response.data['id']) {
                userRoleUpdated = true;
            }
        }
        catch (e) {
            userRoleUpdated = false;
        }
        return userRoleUpdated;
    }

    public async deleteUserRole(roleId: string) {
        let userRoleDeleted = false;
        try {
            await axiosService.delete(`/auth/roles/${roleId}/`);
            userRoleDeleted = true;
        }
        catch (e) {
            userRoleDeleted = false;
        }
        return userRoleDeleted;
    }

    public async getUserGroups() {
        let userGroupsList = [];
        try {
            const response = await axiosService.get('/auth/groups/');
            userGroupsList = response.data.results;
        }
        catch (e: any) {
            userGroupsList = [];
        }
        return userGroupsList;
    }

    public async createUserGroup(name: string, roles: Array<number>) {
        let userGroupCreated = false;
        const data = { name, roles };
        try {
            const response = await axiosService.post('/auth/groups/', data);
            if (response.data['id']) {
                userGroupCreated = true;
            }
        }
        catch (e) {
            userGroupCreated = false;
        }
        return userGroupCreated;
    }

    public async updateUserGroup(id: string, name: string, roles: Array<number>) {
        let userGroupUpdated = false;
        const data = { name, roles };
        try {
            const response = await axiosService.put(`/auth/groups/${id}/`, data);
            if (response.data['id']) {
                userGroupUpdated = true;
            }
        }
        catch (e) {
            userGroupUpdated = false;
        }
        return userGroupUpdated;
    }

    public async deleteUserGroup(groupId: string) {
        let userGroupDeleted = false;
        try {
            await axiosService.delete(`/auth/groups/${groupId}/`);
            userGroupDeleted = true;
        }
        catch (e) {
            userGroupDeleted = false;
        }
        return userGroupDeleted;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const authService = AuthService.Instance;
export default authService;