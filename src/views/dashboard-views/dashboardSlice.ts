import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface DashboardState {
    userlist: any[];
    auditList: any[];
    isOpenCreateUserModal: boolean;
}

const initialState: DashboardState = {
    userlist: [],
    auditList: [],
    isOpenCreateUserModal: false,
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
    },
});

export const { updateUserList, updateAuditList, updateCreateUserModalViewState } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;
export const selectAuditList = (state: RootState) => state.dashboard.auditList;
export const selectCreateUserModalViewState = (state: RootState) => state.dashboard.isOpenCreateUserModal;

export default dashboardSlice.reducer;
