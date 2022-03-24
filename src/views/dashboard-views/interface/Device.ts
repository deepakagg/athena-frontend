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

export interface Device {
    deviceId: string;
    name: string;
    protocol: string;
    configuration: Configuration[];
    dataformat: DataFormat[];
}