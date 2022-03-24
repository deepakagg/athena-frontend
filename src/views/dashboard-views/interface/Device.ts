export interface Configuration {
    label: string;
    type: number | string | boolean;
    required: boolean;
}

export interface DataFormat {
    label: string;
    type: number | string | boolean;
    required: boolean;
}

export interface DeviceTypeTemplate {
    deviceTypeId: string;
    name: string;
    description: string;
    protocol: string;
    configuration: Configuration[];
    dataformat: DataFormat[];
}