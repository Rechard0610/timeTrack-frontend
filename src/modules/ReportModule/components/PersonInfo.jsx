import { useEffect, useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ProjectDescription from './projectDescription';
import List from './list';

ChartJS.register(ArcElement, Tooltip, Legend);

const PersonInfo = ({ config }) => {
    const { entity } = config;
    const description = {entity: 'projectList'}

    return (
        <Row gutter={[16, 16]} className='pt-5'>
            <Col span={24} className='flex flex-wrap justify-between'>
                <Col
                    className="gutter-row"
                    xs={{ span: 48 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                >
                    <div
                        className="whiteBox shadow p-5 flex justify-between"
                        style={{ color: '#595959', fontSize: 13, minHeight: '212px', height: '100%' }}
                    >
                        <div className='w-1/3 mr-5 text-center'>
                            <Avatar
                                style={{
                                    backgroundColor: '#1677ff',
                                    width: '130px',
                                    height: '130px'
                                }}
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=23`}
                            />
                            <List />
                        </div>
                        <ProjectDescription config={description} />
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    xs={{ span: 48 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                >
                    <div
                        className="whiteBox shadow p-5 flex justify-between"
                        style={{ color: '#595959', fontSize: 13, minHeight: '212px', height: '100%' }}
                    >
                        <div className='w-1/3 mr-5 text-center'>
                            <Avatar
                                style={{
                                    backgroundColor: '#1677ff',
                                    width: '130px',
                                    height: '130px'
                                }}
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=25`}
                            />
                            <List />
                        </div>
                        <ProjectDescription config={description} />
                    </div>
                </Col>
            </Col>
        </Row >
    )
}

export default PersonInfo;