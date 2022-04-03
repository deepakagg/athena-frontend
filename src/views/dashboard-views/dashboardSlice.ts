import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Configuration, DataFormat, DeviceTypeTemplate, DeviceTemplate } from '../dashboard-views/interface/Device';

export interface DashboardState {
    userlist: any[];
    userRoleList: any[];
    isOpenCreateUpdateUserRoleModal: boolean;
    userGroupList: any[];
    isOpenCreateUpdateUserGroupModal: boolean;
    auditList: any[];
    isOpenCreateUserModal: boolean;
    isOpenUpdateUserModal: boolean;
    userId: string | undefined;
    deviceTypeDetails: DeviceTypeTemplate[];
    deviceName: string | undefined;
    deviceDescription: string | undefined;
    deviceProtocol: string | undefined;
    deviceConfiguration: Configuration[];
    deviceDataFormat: DataFormat[];
    deviceDetails: DeviceTemplate[];
    editFlag: boolean;
    selectedDeviceType: string | undefined;
    selectedDevice: string | undefined;
}

const initialState: DashboardState = {
    userlist: [],
    userRoleList: [],
    isOpenCreateUpdateUserRoleModal: false,
    userGroupList: [],
    isOpenCreateUpdateUserGroupModal: false,
    auditList: [],
    isOpenCreateUserModal: false,
    isOpenUpdateUserModal: false,
    userId: undefined,
    deviceTypeDetails: [],
    deviceName: undefined,
    deviceDescription: undefined,
    deviceProtocol: undefined,
    deviceConfiguration: [],
    deviceDataFormat: [],
    deviceDetails: [],
    editFlag: false,
    selectedDeviceType: undefined,
    selectedDevice: undefined,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateUserList: (state, action: PayloadAction<any[]>) => {
            state.userlist = action.payload;
        },
        updateUserRoleList: (state, action: PayloadAction<any[]>) => {
            state.userRoleList = action.payload;
        },
        setCreateUpdateUserRoleModalViewState: (state, action: PayloadAction<boolean>) => {
            state.isOpenCreateUpdateUserRoleModal = action.payload;
        },
        updateUserGroupList: (state, action: PayloadAction<any[]>) => {
            state.userGroupList = action.payload;
        },
        setCreateUpdateUserGroupModalViewState: (state, action: PayloadAction<boolean>) => {
            state.isOpenCreateUpdateUserGroupModal = action.payload;
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
        setDeviceTypeDetails: (state, action: PayloadAction<DeviceTypeTemplate[]>) => {
            state.deviceTypeDetails = action.payload;
        },
        setDeviceName: (state, action: PayloadAction<string | undefined>) => {
            state.deviceName = action.payload;
        },
        setDeviceDescription: (state, action: PayloadAction<string | undefined>) => {
            state.deviceDescription = action.payload;
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
        setDeviceDetails: (state, action: PayloadAction<DeviceTemplate[]>) => {
            state.deviceDetails = action.payload;
        },
        setEditFlag: (state, action: PayloadAction<boolean>) => {
            state.editFlag = action.payload;
        },
        setSelectedDeviceType: (state, action: PayloadAction<string | undefined>) => {
            state.selectedDeviceType = action.payload;
        },
        setSelectedDevice: (state, action: PayloadAction<string | undefined>) => {
            state.selectedDevice = action.payload;
        },
    },
});

export const { updateUserList, updateUserRoleList, setCreateUpdateUserRoleModalViewState, updateUserGroupList, setCreateUpdateUserGroupModalViewState, updateAuditList, updateCreateUserModalViewState, setUpdateUserModalViewState, setUserIdState, setDeviceTypeDetails, setDeviceName, setDeviceDescription, setDeviceProtocol, setDeviceConfiguration, setDeviceDataFormat, setDeviceDetails, setEditFlag, setSelectedDeviceType, setSelectedDevice } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;
export const selectUserRoleList = (state: RootState) => state.dashboard.userRoleList;
export const selectCreateUpdateUserRoleModalViewState = (state: RootState) => state.dashboard.isOpenCreateUpdateUserRoleModal;
export const selectUserGroupList = (state: RootState) => state.dashboard.userGroupList;
export const selectCreateUpdateUserGroupModalViewState = (state: RootState) => state.dashboard.isOpenCreateUpdateUserGroupModal;
export const selectAuditList = (state: RootState) => state.dashboard.auditList;
export const selectCreateUserModalViewState = (state: RootState) => state.dashboard.isOpenCreateUserModal;
export const selectUpdateUserModalViewState = (state: RootState) => state.dashboard.isOpenUpdateUserModal;
export const selectUserId = (state: RootState) => state.dashboard.userId;
export const selectDeviceTypeDetails = (state: RootState) => state.dashboard.deviceTypeDetails;
export const selectDeviceName = (state: RootState) => state.dashboard.deviceName;
export const selectDeviceDescription = (state: RootState) => state.dashboard.deviceDescription;
export const selectDeviceProtocol = (state: RootState) => state.dashboard.deviceProtocol;
export const selectDeviceConfiguration = (state: RootState) => state.dashboard.deviceConfiguration;
export const selectDeviceDataFormat = (state: RootState) => state.dashboard.deviceDataFormat;
export const selectDeviceDetails = (state: RootState) => state.dashboard.deviceDetails;
export const selectEditFlag = (state: RootState) => state.dashboard.editFlag;
export const selectDeviceType = (state: RootState) => state.dashboard.selectedDeviceType;
export const selectDevice = (state: RootState) => state.dashboard.selectedDevice;

export default dashboardSlice.reducer;
