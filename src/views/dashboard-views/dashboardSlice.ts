import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface DashboardState {
    userlist: any[];
    auditList: any[];
}

const initialState: DashboardState = {
    userlist: [],
    auditList: [],
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
    },
});

export const { updateUserList, updateAuditList } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;
export const selectAuditList = (state: RootState) => state.dashboard.auditList;

export default dashboardSlice.reducer;
