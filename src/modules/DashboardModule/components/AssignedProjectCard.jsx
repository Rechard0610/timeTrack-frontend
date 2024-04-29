import { useEffect, useState } from 'react';
import { Col, Badge } from 'antd';
import { PieChart } from 'react-minimal-pie-chart';
import { request } from '@/request';

export default function AssignedProjectCard({ data, isLoading = false }) {
    const entity = `dashboard/assignedProject`;
    const colorList = ['rgb(115, 168, 252)', 'rgb(62, 204, 146)', 'rgb(182, 180, 250)', 'rgb(182, 180, 250)', 'rgb(182, 180, 250)']
    const [assignedProject, setTopAssignedProject] = useState([]);

    const formatMilliseconds = (milliseconds) => {
        let totalSeconds = Math.floor(milliseconds);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    const dispatcher = async () => {
        const jsonData = { 'limit': 5 };
        const data = await request.post({ entity, jsonData });
        const results = data.result;
        const chartData = [];
        if (results) {
            results.map((item, index) => {
                chartData.push({
                    type: `${item.projectnumber} ${item.description}`, value: item.spentTime / 60,
                    color: colorList[index], time: formatMilliseconds(item.spentTime)
                })
            })
        }

        console.log(chartData);
        setTopAssignedProject(chartData);
    };

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
                <div className="pad15 strong justify-center" style={{ justifyContent: 'center' }}>
                    <div
                        style={{
                            margin: '2px 0',
                            textTransform: 'capitalize',
                        }}
                    >
                        <span className='font-bold text-[16px]'>Top Assigned Projects</span>
                    </div>
                </div>
                <div className='bg-slate-50 border-2 rounded-lg mx-3'>
                    <div className='grid justify-between p-4' style={{ gridTemplateColumns: "47% 47%" }}>
                        <PieChart className="float-left w-60 ml-10"
                            data={assignedProject}
                            lineWidth={45}
                            background='grey'
                        />
                        <div className='grid justify-between'>
                            {
                                assignedProject && assignedProject.map((chatdata, index) => (
                                    <div key={index} className='flex justify-between gap-x-2.5 items-center' style={{ whiteSpace: 'nowrap' }}>
                                        <div className='grid grid-template-auto'>
                                            <Badge color={chatdata.color} />
                                            <span className='ml-3 text-[12px]'>{chatdata.type}</span>
                                        </div>
                                        <span className='right mx-5 text-[12px]'>{chatdata.time}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}
