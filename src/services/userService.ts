import authService from './authService';

class UserService {
    private static _instance: UserService;
    private constructor() { }

    public async getUserList() {
        try {
            const response = await authService.listUsers();
            const userlist = response.map((item: any) => {
                return ({
                    "id": item['id'],
                    "name": `${item['first_name']} ${item['last_name']}`,
                    "email": item['email'],
                    "img": "/img/avatars/avatar-common.png",
                    "role": item['is_admin'] ? 'Admin' : 'User',
                    "lastOnline": item['last_login'] ? Math.round(Date.parse(item['last_login']) / 1000) : 0,
                    "status": item['is_active'] ? 'active' : 'inactive',
                    "personalInfo": {
                        "location": "New York, US",
                        "title": "Product Manager",
                        "birthday": "10/10/1992",
                        "phoneNumber": "+12-123-1234",
                        "facebook": "facebook.com/sample",
                        "twitter": "twitter.com/sample",
                        "instagram": "instagram.com/sample",
                        "site": "samplesite.com"
                    }
                });
            });
            return userlist;
        }
        catch (e) {
            return [];
        }
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const userService = UserService.Instance;
export default userService;