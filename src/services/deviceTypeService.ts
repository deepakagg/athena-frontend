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

    public async createDeviceType(data: DeviceTypeTemplate) {
        let deviceTypeCreated = false;
        try {
            const response = await axiosService.post('/device/devicetype/', {
                name: data.name,
                description: data.description,
                device_type: data.protocol,
                device_configuration: data.configuration,
                device_data_format: data.dataformat,
            });
            if (response.data['id']) {
                deviceTypeCreated = true;
            }
        }
        catch (e) {
            deviceTypeCreated = false;
        }
        return deviceTypeCreated;
    }

    public async updateDeviceType(devicetypeid: string, data: DeviceTypeTemplate) {
        let deviceTypeUpdated = false;
        try {
            const response = await axiosService.put(`/device/devicetype/${devicetypeid}/`, {
                name: data.name,
                description: data.description,
                device_type: data.protocol,
                device_configuration: data.configuration,
                device_data_format: data.dataformat,
            });
            if (response.data['id']) {
                deviceTypeUpdated = true;
            }
        }
        catch (e) {
            deviceTypeUpdated = false;
        }
        return deviceTypeUpdated;
    }

    public async deleteDeviceType(devicetypeid: string) {
        let deviceTypeDeleted = false;
        try {
            await axiosService.delete(`/device/devicetype/${devicetypeid}/`);
            deviceTypeDeleted = true;
        }
        catch (e) {
            deviceTypeDeleted = false;
        }
        return deviceTypeDeleted;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const deviceTypeService = DeviceTypeService.Instance;
export default deviceTypeService;