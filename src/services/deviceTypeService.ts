import { DeviceTypeTemplate } from 'views/dashboard-views/interface/Device';
import axiosService from './axiosService';

class DeviceTypeService {
    private static _instance: DeviceTypeService;
    private constructor() { }

    public async getDeviceTypeList() {
        let deviceTypeList: DeviceTypeTemplate[];
        try {
            const response = await axiosService.get('/device/devicetype/');
            deviceTypeList = response.data.results.map((item: { id: any; name: any; description: any; device_type: any; device_configuration: any; device_data_format: any; }) => {
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    protocol: item.device_type,
                    configuration: item.device_configuration,
                    dataformat: item.device_data_format,
                };
            });
        }
        catch (e) {
            deviceTypeList = [];
        }
        return deviceTypeList;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const deviceTypeService = DeviceTypeService.Instance;
export default deviceTypeService;