import UserList from '../user-list';
import UserAuditLogs from '../user-audit-logs';

export const AppContainer = (props: { itemSelected: string, userList: any, dispatchUserList: any }) => {
    if(props.itemSelected === 'manage-users-list'){
        return <UserList userList={props.userList} dispatchUserList={props.dispatchUserList}/>;
    } else if(props.itemSelected === 'manage-user-audit-logs'){
        return <UserAuditLogs/>;
    } else{
        return <div/>;
    }
};

export default AppContainer;
