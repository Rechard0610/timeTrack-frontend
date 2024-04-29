import { useEffect, useState } from 'react';
import { Col, Badge } from 'antd';
import { PieChart } from 'react-minimal-pie-chart';
import { request } from '@/request';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AssignChart({ config }) {
    const { entity, title } = config;
    // const entity = `dashboard/assignedProject`;
    // const colorList = ['rgb(115, 168, 252)', 'rgb(62, 204, 146)', 'rgb(182, 180, 250)', 'rgb(182, 180, 250)', 'rgb(182, 180, 250)']
    // const [assignedProject, setTopAssignedProject] = useState([]);

    // const formatMilliseconds = (milliseconds) => {
    //     let totalSeconds = Math.floor(milliseconds);
    //     let hours = Math.floor(totalSeconds / 3600);
    //     let minutes = Math.floor((totalSeconds % 3600) / 60);
    //     let seconds = totalSeconds % 60;
    //     let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //     return formattedTime;
    // }

    // const dispatcher = async () => {
    //     const jsonData = { 'limit': 5 };
    //     const data = await request.post({ entity, jsonData });
    //     const results = data.result;
    //     const chartData = [];
    //     if (results) {
    //         results.map((item, index) => {
    //             chartData.push({
    //                 type: `${item.projectnumber} ${item.description}`, value: item.spentTime / 60,
    //                 color: colorList[index], time: formatMilliseconds(item.spentTime)
    //             })
    //         })
    //     }

    //     console.log(chartData);
    //     setTopAssignedProject(chartData);
    // };

    // useEffect(() => {
    //     dispatcher();
    // }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
            title: {
                display: true,
                text: title === 'Clients' ? 'Clients' : 'Finished Projects',
            },
        },
    };

    const data = {
        labels: 'Client',
        datasets: [
            {
                label: 'Budget',
                data: '12',
                backgroundColor: 'rgb(244 63 94)',
            },
            {
                label: 'Spent Time',
                data: '13',
                backgroundColor: 'green',
            },
            {
                label: 'Spent Time',
                data: '13',
                backgroundColor: 'green',
            },
            {
                label: 'Spent Time',
                data: '13',
                backgroundColor: 'green',
            },
        ],
    };

    return (
        <Col
            className="gutter-row pt-5 px-2"
            xs={{ span: 48 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
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
                        <span className='font-bold text-[16px]'>Top Assigned {title}</span>
                    </div>
                </div>
                <div className='bg-slate-50 border-2 rounded-lg mx-3'>
                    <div className='grid justify-between p-4' style={{ gridTemplateColumns: "30% 68%" }}>
                        <PieChart className="float-left w-72 ml-10"
                            lineWidth={60}
                            background='grey'
                        />
                        <div
                            className="whiteBox shadow p-5"
                            style={{ color: '#595959', fontSize: 13, height: '100%', width: '100%'  }}
                        >
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}
