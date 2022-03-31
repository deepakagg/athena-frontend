import React, { useEffect, useState } from 'react'
import { Card, Spin, Table } from 'antd';
import auditService from '../../../../services/auditService';
import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAuditList, updateAuditList } from 'views/dashboard-views/dashboardSlice';

export const DeviceAuditLogs = () => {
    const auditList = useAppSelector(selectAuditList);
    const dispatch = useAppDispatch();
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);

    useEffect(() => {
        setDatatableLoaderState(true);
        auditService.getAuditList()
            .then((auditLogList) => { dispatch(updateAuditList(getDeviceAuditLogs(auditLogList))); setDatatableLoaderState(false); })
            .catch((e) => { console.log(e); dispatch(updateAuditList([])); setDatatableLoaderState(false); })
    }, [dispatch]);

    const getDeviceAuditLogs = (auditLogList: any[]): any[] => {
        return auditLogList.filter((item: any) => {
            return item.content_type === 'device' || item.content_type === 'devicedata';
        });
    }

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

export default DeviceAuditLogs;
