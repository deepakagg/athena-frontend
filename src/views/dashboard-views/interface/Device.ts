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

export interface ConfigurationDevice {
    label: string;
    value: string | number | boolean;
}

export interface DataFormatDevice {
    label: string;
    value: string | number | boolean;
}

export interface DeviceTemplate {
    deviceId: string;
    name: string;
    devicetype: string;
    description: string;
    configuration: ConfigurationDevice[];
    dataformat: DataFormatDevice[];
}