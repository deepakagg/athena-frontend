import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Configuration, DataFormat, Device } from '../dashboard-views/interface/Device';

export interface DashboardState {
    userlist: any[];
    auditList: any[];
    isOpenCreateUserModal: boolean;
    isOpenUpdateUserModal: boolean;
    userId: string | undefined;
    deviceDetails: Device[];
    deviceName: string | undefined;
    deviceProtocol: string | undefined;
    deviceConfiguration: Configuration[];
    deviceDataFormat: DataFormat[];
}

const initialState: DashboardState = {
    userlist: [],
    auditList: [],
    isOpenCreateUserModal: false,
    isOpenUpdateUserModal: false,
    userId: undefined,
    deviceDetails: [],
    deviceName: undefined,
    deviceProtocol: undefined,
    deviceConfiguration: [],
    deviceDataFormat: [],
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateUserList: (state, action: PayloadAction<any[]>) => {
            state.userlist = action.payload;
        },
        updateAuditList: (state, action: PayloadAction<any[]>) => {
            state.auditList = action.payload;
        },
        updateCreateUserModalViewState: (state, action: PayloadAction<boolean>) => {
            state.isOpenCreateUserModal = action.payload;
        },
        setUpdateUserModalViewState: (state, action: PayloadAction<boolean>) => {
            state.isOpenUpdateUserModal = action.payload;
        },
        setUserIdState: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setDeviceDetails: (state, action: PayloadAction<Device[]>) => {
            state.deviceDetails = action.payload;
        },
        setDeviceName: (state, action: PayloadAction<string | undefined>) => {
            state.deviceName = action.payload;
        },
        setDeviceProtocol: (state, action: PayloadAction<string | undefined>) => {
            state.deviceProtocol = action.payload;
        },
        setDeviceConfiguration: (state, action: PayloadAction<Configuration[]>) => {
            state.deviceConfiguration = action.payload;
        },
        setDeviceDataFormat: (state, action: PayloadAction<DataFormat[]>) => {
            state.deviceDataFormat = action.payload;
        },
    },
});

export const { updateUserList, updateAuditList, updateCreateUserModalViewState, setUpdateUserModalViewState, setUserIdState, setDeviceDetails, setDeviceName, setDeviceProtocol, setDeviceConfiguration, setDeviceDataFormat } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;
export const selectAuditList = (state: RootState) => state.dashboard.auditList;
export const selectCreateUserModalViewState = (state: RootState) => state.dashboard.isOpenCreateUserModal;
export const selectUpdateUserModalViewState = (state: RootState) => state.dashboard.isOpenUpdateUserModal;
export const selectUserId = (state: RootState) => state.dashboard.userId;
export const selectDeviceDetails = (state: RootState) => state.dashboard.deviceDetails;
export const selectDeviceName = (state: RootState) => state.dashboard.deviceName;
export const selectDeviceProtocol = (state: RootState) => state.dashboard.deviceProtocol;
export const selectDeviceConfiguration = (state: RootState) => state.dashboard.deviceConfiguration;
export const selectDeviceDataFormat = (state: RootState) => state.dashboard.deviceDataFormat;

export default dashboardSlice.reducer;
