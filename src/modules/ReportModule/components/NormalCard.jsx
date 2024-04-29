import { Row, Col, Card } from 'antd';

const NormalCard = ({ config }) => {
    const { entity, title } = config;

    return (
        <Row gutter={[16, 16]} className='pt-5'>
            <Col span={24} className='flex flex-wrap justify-between'>
                <Col
                    className="gutter-row"
                    xs={{ span: 48 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                >
                    <div
                        className="whiteBox shadow p-5 text-center content-center"
                        style={{ color: '#595959', fontSize: 15 }}
                    >
                        <p>{title[0]}</p>
                        <p>150h</p>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    xs={{ span: 48 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                >
                    <div
                        className="whiteBox shadow p-5 text-center content-center"
                        style={{ color: '#595959', fontSize: 15 }}
                    >
                        <p>{title[1]}</p>
                        <p>150h</p>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    xs={{ span: 48 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                >
                    <div
                        className="whiteBox shadow p-5 text-center content-center"
                        style={{ color: '#595959', fontSize: 15 }}
                    >
                        <p>{title[2]}</p>
                        <p>150h</p>
                    </div>
                </Col>
            </Col>
        </Row>
    )
}

export default NormalCard;