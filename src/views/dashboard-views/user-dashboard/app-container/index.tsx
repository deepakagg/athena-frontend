import UserList from '../user-list';
import UserAuditLogs from '../user-audit-logs';

export const AppContainer = (props: { itemSelected: string }) => {
    if(props.itemSelected === 'manage-users-list'){
        return <UserList/>;
    } else if(props.itemSelected === 'manage-user-audit-logs'){
        return <UserAuditLogs/>;
    } else{
        return <div/>;
    }
};

export default AppContainer;
