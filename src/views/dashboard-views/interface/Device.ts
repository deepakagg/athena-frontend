export interface Configuration {
    label: string;
    type: string | number | boolean;
    required: boolean;
}

export interface DataFormat {
    label: string;
    type: string | number | boolean;
    required: boolean;
}

export interface DeviceTypeTemplate {
    deviceTypeId: string;
    name: string;
    description?: string;
    protocol?: string;
    configuration: Configuration[];
    dataformat: DataFormat[];
}

export interface DeviceTemplate {
    deviceId: string;
    name: string;
    description: string;
    protocol: string;
    configuration: Configuration[];
    dataformat: DataFormat[];
}