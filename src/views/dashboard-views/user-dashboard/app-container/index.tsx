import UserList from '../user-list';
import UserAuditLogs from '../user-audit-logs';
import DeviceTemplate from "../device-template";

export const AppContainer = (props: { itemSelected: string, userList: any, auditList: any, dispatch: any }) => {
    if (props.itemSelected === 'manage-users-list') {
        return <UserList userList={props.userList} dispatch={props.dispatch} />;
    } else if (props.itemSelected === 'manage-user-audit-logs') {
        return <UserAuditLogs auditList={props.auditList} dispatch={props.dispatch} />;
    } else if (props.itemSelected === 'device-template') {
        return <DeviceTemplate />
    } else {
        return <div />;
    }
};

export default AppContainer;
