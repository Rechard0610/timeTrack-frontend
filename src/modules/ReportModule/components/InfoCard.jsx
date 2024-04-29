import { Row, Col } from 'antd';
import Card from './Card';
import { useEffect } from 'react';
import { request } from '@/request';

const InfoCard = ({ config }) => {
  const { entity, title } = config;

  const dispatcher = async () => {
    const data = await request.post({ entity, jsonData });
  };

  useEffect(() => {
    dispatcher();
  }, []);

  console.log(entity);
  console.log(title);
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="flex flex-wrap justify-between pt-5">
        <Card title={title[0]}></Card>
        <Card title={title[1]}></Card>
        <Card title={title[2]}></Card>
      </Col>
    </Row>
  );
};

export default InfoCard;
