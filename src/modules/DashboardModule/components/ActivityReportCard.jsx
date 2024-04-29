import { Row, Col } from 'antd';
import { Progress } from 'rsuite';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

export default function ActivityReportCard({ data, isLoading = false }) {
    const reportList = [
        { month: "Feb", day: "21", process: "86" },
        { month: "Feb", day: "22", process: "80" },
        { month: "Feb", day: "23", process: "20" },
        { month: "Feb", day: "24", process: "30" },
        { month: "Feb", day: "25", process: "21" },
        { month: "Feb", day: "26", process: "22" },
        { month: "Feb", day: "27", process: "76" },
    ];

    return (
        <Col
            className="gutter-row"
            xs={{ span: 48 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
        >
            <div
                className="whiteBox shadow"
                style={{ color: '#595959', fontSize: 13, minHeight: '212px', height: '100%' }}
            >
                <div className="pad15 strong justify-center">
                    <div
                        style={{
                            margin: '2px 0',
                        }}
                    >
                        <span className='font-bold text-[16px]'>Activity Report</span>
                        <span className='ml-5'>All Projects</span>
                        <span className='right text-emerald-500 cursor-pointer'>See More</span>
                    </div>
                </div>
                <Row className='flex justify-between' style={{height: 230}}>
                    {
                        reportList.map((report, index) => (
                            <div key={index} className='mx-2'>
                                <Progress.Line className='mx-4 rounded-md' vertical percent={10 * index} showInfo={false} 
                                    strokeColor='#6ee7b7'/>
                                <div className='rounded-xl text-center border p-2 mt-5'>
                                    <p>{report.month}</p>
                                    <p>{report.day}</p>
                                </div>
                            </div>
                        ))
                    }
                </Row>
            </div>
        </Col>
    );
}
