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

            deviceList = deviceconfigurationResponse.data.results.map((item: any) => {
                const requiredIndexDeviceData = devicedataResponse.data.results.findIndex((element: any) => {
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
                };
            });
        }
        catch (e) {
            deviceList = [];
        }
        return deviceList;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const deviceService = DeviceService.Instance;
export default deviceService;