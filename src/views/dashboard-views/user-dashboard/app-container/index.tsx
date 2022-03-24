import UserList from '../user-list';
import UserAuditLogs from '../user-audit-logs';
import DeviceTypeTemplateView from "../device-type-template";
import DeviceTypeList from "../device-type-list";
import DeviceTemplateView from '../device-template';
import DeviceList from '../device-list';

export const AppContainer = (props: { itemSelected: string, userList: any, auditList: any, dispatch: any }) => {
    if (props.itemSelected === 'manage-users-list') {
        return <UserList userList={props.userList} dispatch={props.dispatch} />;
    } else if (props.itemSelected === 'manage-user-audit-logs') {
        return <UserAuditLogs auditList={props.auditList} dispatch={props.dispatch} />;
    } else if (props.itemSelected === 'device-type-template') {
        return <DeviceTypeTemplateView />
    } else if (props.itemSelected === 'device-type-list') {
        return <DeviceTypeList />
    }  else if (props.itemSelected === 'device-template') {
        return <DeviceTemplateView />
    } else if (props.itemSelected === 'device-list') {
        return <DeviceList />
    } else {
        return <div />;
    }
};

export default AppContainer;
