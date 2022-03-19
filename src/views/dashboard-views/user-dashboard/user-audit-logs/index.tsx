import React, { Component } from 'react'
import { Card, Table } from 'antd';
import auditService from '../../../../services/auditService';
import {
    updateAuditList,
} from '../../dashboardSlice';
import ReactJson from 'react-json-view';

interface IProps {
    auditList: any[],
    dispatch: any,
}

export class UserAuditLogs extends Component<IProps> {
    componentDidMount = async () => {
        try {
            const auditLogList = await auditService.getAuditList();
            this.props.dispatch(updateAuditList(auditLogList));
        }
        catch (e) {
            this.props.dispatch(updateAuditList([]));
        }
    }

    render() {
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
                    <ReactJson collapsed={true} src={JSON.parse(changes)} enableClipboard={false}/>
                ),
            },
        ];
        return (
            <Card bodyStyle={{ 'padding': '0px' }}>
                <div className="table-responsive">
                    <Table columns={tableColumns} dataSource={this.props.auditList} rowKey='id' />
                </div>
            </Card>
        )
    }
}

export default UserAuditLogs
