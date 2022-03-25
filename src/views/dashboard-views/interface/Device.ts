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
    id: string;
    name: string;
    description?: string;
    protocol?: string;
    configuration: Configuration[];
    dataformat: DataFormat[];
}

export interface ConfigurationDevice {
    label: string;
    value: string | number | boolean;
    type?: string;
    required?: boolean;
}

export interface DataFormatDevice {
    label: string;
    value: string | number | boolean;
    type?: string;
    required?: boolean;
}

export interface DeviceTemplate {
    id: string;
    name: string;
    devicetype: string;
    description: string;
    configuration: ConfigurationDevice[];
    dataformat: DataFormatDevice[];
}