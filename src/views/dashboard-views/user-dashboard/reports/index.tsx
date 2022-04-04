import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'antd';
import { report } from './data';
import { ReportPanelLayout } from './types';

export const Reports = () => {
    return (<Row gutter={16}>
        {
            report.layout.panels.map((item: ReportPanelLayout, index) => {
                return <Col span={item.size} key={item.order}>
                    <Card title={item.title} >
                        {

                        }
                    </Card>
                </Col>
            })
        }
        </Row>)
}

export default Reports;