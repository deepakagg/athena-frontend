import { DeviceTemplate } from 'views/dashboard-views/interface/Device';
import axiosService from './axiosService';

class DeviceService {
    private static _instance: DeviceService;
    private constructor() { }

    public async getDeviceList() {
        let deviceList: DeviceTemplate[] = [];
        try {
            // const devicedataResponse = await axiosService.get('/device/devicedata/');
            const deviceconfigurationResponse = await axiosService.get('/device/device/');
            const devicetypeResponse = await axiosService.get('/device/devicetype/');

            let devicetype: string = '';
            // let devicedata: any[] = [];
            // let devicedataid: string = '';

            deviceList = deviceconfigurationResponse.data.results.map((item: any) => {
                // const requiredIndexDeviceData = devicedataResponse.data.results.findIndex((element: any) => {
                //     if (element.device === item.id) {
                //         devicedataid = element.id;
                //     }
                //     return element.device === item.id;
                // });
                // if (requiredIndexDeviceData === -1) {
                //     devicedata = [];
                // } else {
                //     devicedata = devicedataResponse.data.results[requiredIndexDeviceData].data;
                // }

                const requiredIndexDeviceType = devicetypeResponse.data.results.findIndex((element: any) => {
                    return element.id === item.device_type;
                });
                if (requiredIndexDeviceType === -1) {
                    devicetype = '';
                } else {
                    devicetype = devicetypeResponse.data.results[requiredIndexDeviceType].name;
                }

                return {
                    id: item.id,
                    name: item.device_uuid,
                    device_type: devicetype,
                    device_type_id: item.device_type,
                    device_uuid: item.device_uuid,
                    description: '',
                    configuration: item.device_configuration,
                    // dataformat: devicedata,
                    // dataid: devicedataid,
                };
            });
        }
        catch (e) {
            deviceList = [];
        }
        return deviceList;
    }

    public async createDevice(data: DeviceTemplate) {
        let deviceCreated = false;
        try {
            const responseDeviceConfigurationCreate = await axiosService.post('/device/device/', {
                device_type: parseInt(data.device_type),
                device_uuid: data.device_uuid,
                device_configuration: data.configuration,
            });
            // if (responseDeviceConfigurationCreate.data['id']) {
            //     await axiosService.post('/device/devicedata/', {
            //         device: responseDeviceConfigurationCreate.data['id'],
            //         data: data.dataformat,
            //     });
            //     deviceCreated = true;
            // }
            deviceCreated = true;
        }
        catch (e) {
            deviceCreated = false;
        }
        return deviceCreated;
    }

    public async updateDevice(data: DeviceTemplate) {
        let deviceUpdated = false;
        try {
            const responseDeviceConfigurationUpdate = await axiosService.put(`/device/device/${data.id}/`, {
                device_type: data.device_type_id,
                device_uuid: data.device_uuid,
                device_configuration: data.configuration,
            });
            // if (responseDeviceConfigurationUpdate.data['id']) {
            //     await axiosService.put(`/device/devicedata/${data.dataid}/`, {
            //         device: responseDeviceConfigurationUpdate.data['id'],
            //         data: data.dataformat,
            //     });
            //     deviceUpdated = true;
            // }
            deviceUpdated = true;
        }
        catch (e) {
            deviceUpdated = false;
        }
        return deviceUpdated;
    }

    public async deleteDevice(deviceid: string) {
        let deviceDeleted = false;
        try {
            // await axiosService.delete(`/device/devicedata/${dataid}/`);
            await axiosService.delete(`/device/device/${deviceid}/`);
            deviceDeleted = true;
        }
        catch (e) {
            deviceDeleted = false;
        }
        return deviceDeleted;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const deviceService = DeviceService.Instance;
export default deviceService;