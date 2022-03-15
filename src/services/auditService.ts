import axiosService from './axiosService';

class AuditService {
    private static _instance: AuditService;
    private constructor() { }

    public async getAuditList() {
        let auditList = [];
        try {
            const response = await axiosService.get('/audit');
            auditList = response.data.results.map((item: { [x: string]: any; }) => {
                return (
                    {
                        id: item['id'],
                        content_type: item['content_type'],
                        changes: item['changes'],
                        actor: item['actor'],
                    }
                );
            });
        }
        catch (e) {
            auditList = [];
        }
        return auditList;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const auditService = AuditService.Instance;
export default auditService;