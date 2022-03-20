import React, { useEffect, useState } from 'react'
import { Card, Spin, Table } from 'antd';
import auditService from '../../../../services/auditService';
import {
    updateAuditList,
} from '../../dashboardSlice';
import ReactJson from 'react-json-view';

interface IProps {
    auditList: any[],
    dispatch: any,
}

export const UserAuditLogs = (props: IProps) => {
    const { auditList, dispatch } = props;
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);

    useEffect(() => {
        setDatatableLoaderState(true);
        auditService.getAuditList()
            .then((auditLogList) => { dispatch(updateAuditList(auditLogList)); setDatatableLoaderState(false); })
            .catch((e) => { console.log(e); dispatch(updateAuditList([])); setDatatableLoaderState(false); })
    }, [dispatch]);

    const tableColumns: any = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Content type',
            dataIndex: 'content_type',
        },
        {
            title: 'Actor',
            dataIndex: 'actor',
        },
        {
            title: 'Changes',
            dataIndex: 'changes',
            render: (changes: string) => (
                <ReactJson collapsed={true} src={JSON.parse(changes)} enableClipboard={false} />
            ),
        },
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            <div className="table-responsive">
                {datatableLoaderState ? <Spin tip="Loading...">
                    <Table columns={tableColumns} dataSource={auditList} rowKey='id' />
                </Spin> : <Table columns={tableColumns} dataSource={auditList} rowKey='id' />}
            </div>
        </Card>
    );
};

export default UserAuditLogs;
