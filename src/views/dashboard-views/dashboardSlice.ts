import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface DashboardState {
    userlist: any[];
    auditList: any[];
    isOpenCreateUserModal: boolean;
    isOpenUpdateUserModal: boolean;
    userId: string | undefined;
}

const initialState: DashboardState = {
    userlist: [],
    auditList: [],
    isOpenCreateUserModal: false,
    isOpenUpdateUserModal: false,
    userId: undefined,
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
    },
});

export const { updateUserList, updateAuditList, updateCreateUserModalViewState, setUpdateUserModalViewState, setUserIdState } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;
export const selectAuditList = (state: RootState) => state.dashboard.auditList;
export const selectCreateUserModalViewState = (state: RootState) => state.dashboard.isOpenCreateUserModal;
export const selectUpdateUserModalViewState = (state: RootState) => state.dashboard.isOpenUpdateUserModal;
export const selectUserId = (state: RootState) => state.dashboard.userId;

export default dashboardSlice.reducer;
