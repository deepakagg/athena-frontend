import { DeviceTemplate } from 'views/dashboard-views/interface/Device';
import axiosService from './axiosService';

class DeviceService {
    private static _instance: DeviceService;
    private constructor() { }

    public async getDeviceList() {
        let deviceList: DeviceTemplate[] = [];
        try {
            const devicedataResponse = await axiosService.get('/device/devicedata/');
            const deviceconfigurationResponse = await axiosService.get('/device/device/');
            const devicetypeResponse = await axiosService.get('/device/devicetype/');

            let devicetype: string = '';
            let devicedata: any[] = [];
            let devicedataid: string = '';

            deviceList = deviceconfigurationResponse.data.results.map((item: any) => {
                const requiredIndexDeviceData = devicedataResponse.data.results.findIndex((element: any) => {
                    if (element.device === item.id) {
                        devicedataid = element.id;
                    }
                    return element.device === item.id;
                });
                if (requiredIndexDeviceData === -1) {
                    devicedata = [];
                } else {
                    devicedata = devicedataResponse.data.results[requiredIndexDeviceData].data;
                }

                const requiredIndexDeviceType = devicetypeResponse.data.results.findIndex((element: any) => {
                    return element.id === item.device_type;
                });
                if (requiredIndexDeviceData === -1) {
                    devicetype = '';
                } else {
                    devicetype = devicetypeResponse.data.results[requiredIndexDeviceType].name;
                }

                return {
                    id: item.id,
                    name: `${item.id}`,
                    devicetype: devicetype,
                    description: '',
                    configuration: item.device_configuration,
                    dataformat: devicedata,
                    dataid: devicedataid,
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
                device_type: parseInt(data.devicetype),
                device_uuid: data.id,
                device_configuration: data.configuration,
            });
            if (responseDeviceConfigurationCreate.data['id']) {
                await axiosService.post('/device/devicedata/', {
                    device: responseDeviceConfigurationCreate.data['id'],
                    data: data.dataformat,
                });
                deviceCreated = true;
            }
        }
        catch (e) {
            deviceCreated = false;
        }
        return deviceCreated;
    }

    public async deleteDevice(deviceid: string, dataid: string) {
        let deviceDeleted = false;
        try {
            await axiosService.delete(`/device/devicedata/${dataid}/`);
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