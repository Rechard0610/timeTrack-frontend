import { useEffect, useState } from 'react';
import { Row, Col, Badge, Progress } from 'antd';
import { TrophyOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { request } from '@/request';

export default function MemberRankingCard({ title, stand, data, prefix, isLoading = false }) {
  const entity = `dashboard/${stand}`;
  const [topMember, setTopMember] = useState(null);

  const dispatcher = async () => {
    const jsonData = { 'limit': 5};
    const data = await request.post({ entity, jsonData });
    setTopMember(data.result);
  };

  const formatMilliseconds = (milliseconds) => {
    let totalSeconds = Math.floor(milliseconds);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
}

  useEffect(() => {
    dispatcher();
  }, []);

  return (
    <Col
      className="gutter-row"
      xs={{ span: 48 }}
      sm={{ span: 24 }}
      md={{ span: 24 }}
      lg={{ span: 12 }}
    >
      <div
        className="whiteBox shadow p-5"
        style={{ color: '#595959', fontSize: 13, minHeight: '212px', height: '100%' }}
      >
        <div className="pad15 strong justify-center">
          <h3
            style={{
              color: '#22075e',
              fontSize: 'large',
              margin: '2px 0',
              textTransform: 'capitalize',
            }}
          >
            <TrophyOutlined className='text-amber-400' />
            <span className='ml-5 font-bold text-emerald-500'>{title}</span>
            <span className='right text-emerald-500 cursor-pointer text-[12px]'>See More</span>
          </h3>
        </div>
        <div>
          {
            topMember && topMember.map((member, index) => (
              <div className="px-4 py-2" key={index}>
                <Row gutter={[0, 0]} justify="space-between" wrap={false}>
                  <Col className="gutter-row" style={{ textAlign: 'left' }}>
                    <div className="left" style={{ whiteSpace: 'nowrap' }}>
                      {index === 0 && <Badge color="rgb(115, 192, 255)" />}
                      {index === 1 && <Badge color="rgb(249, 221, 143)" />}
                      {index === 2 && <Badge color="rgb(175, 192, 249)" />}
                      {index === 3 && <Badge color="rgb(97, 229, 172)" />}
                      {index === 4 && <Badge color="rgb(249, 130, 139)" />}
                      <span className='ml-5 text-[16px]'>{`${member?._id?.firstname} ${member?._id?.lastname}`}</span>
                    </div>
                  </Col>
                  <Col
                    className="gutter-row"
                    flex="auto"
                    style={{
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'right',
                    }}
                  >
                    {
                      stand === "logged" &&
                      <div style={{ whiteSpace: 'nowrap' }} className='w-[180px] text-right'>
                        <ClockCircleOutlined className='text-emerald-400' />
                        <span className='ml-5 text-[16px]'>{formatMilliseconds(member?.totalRange)}</span>
                      </div>
                    }
                    {
                      stand === "activity" &&
                      <div style={{ whiteSpace: 'nowrap' }} className='w-[180px] flex'>
                        <Progress percent={Math.floor(Number(member.percentage))} showInfo={false} strokeColor="#6ee7b7" />
                        <span className='text-[16px]'>{Math.floor(member.percentage)}%</span>
                      </div>
                    }
                    {
                      stand === "productivity" &&
                      <div style={{ whiteSpace: 'nowrap' }} className='w-[180px] flex'>
                        <Progress percent={Math.floor(Number(member.percentage))} showInfo={false} strokeColor="#6ee7b7" />
                        <span className='text-[16px]'>{Math.floor(member.percentage)}%</span>
                      </div>
                    }
                  </Col>
                </Row>
              </div>
            ))
          }
        </div>
      </div>
    </Col>
  );
}
