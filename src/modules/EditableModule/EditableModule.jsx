import { useLayoutEffect, useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

import InfoCard from './components/infocard'
import EditableTable from '@/components/EditableTable';

import { useDispatch, useSelector } from 'react-redux';


function EditableModule({ config, withUpload = false }) {
  const dispatch = useDispatch();

  return (
    <>
      <Row gutter={16} style={{ marginBottom: '16px', marginTop: '32px' }}>
        <Col span={8}>
          <InfoCard label={'Total Members'} value={0} />
        </Col>
        <Col span={8}>
          <InfoCard label={'Total Spent This Week'} value={0} />
        </Col>
        <Col span={8}>
          <InfoCard label={'Total Spent This Month'} value={0} />
        </Col>
        {/* <Col span={6}>
          <InfoCard label={'NEUTRAL TIME'} value={neutralTime} />
        </Col> */}
      </Row>
      <Card>
        <EditableTable config={config} />
      </Card>
    </>
  );
}

export default EditableModule;
