import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface DashboardState {
    userlist: any[];
}

const initialState: DashboardState = {
    userlist: [],
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateUserList: (state, action: PayloadAction<any[]>) => {
            state.userlist = action.payload;
        },
    },
});

export const { updateUserList } = dashboardSlice.actions;

export const selectUserList = (state: RootState) => state.dashboard.userlist;

export default dashboardSlice.reducer;
