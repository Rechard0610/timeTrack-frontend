import { Col } from 'antd';
import { useEffect, useState } from 'react';
import { request } from '@/request';;

export default function OngoingTaskCard({ data, isLoading = false }) {

    const entity = `dashboard/onGoingTask`;

    // const taskList = [
    //     { taskName: "Auditiong Information Architecture", projectName: "Falcom Heavy", workTime: "34:03:23", bgColor: "bg-[#ccfbf1]"  },
    //     { taskName: "Launch Marketing Campaign", projectName: "Falcom Heavy", workTime: "26:53:40", bgColor: "bg-[#dcfce7]" },
    //     { taskName: "Low-Fidelity Design-Mobile", projectName: "StarShip", workTime: "25:05:49", bgColor: "bg-[#fef3c7]" },
    //     { taskName: "Brainstorming on New Branding", projectName: "Grashhopper", workTime: "23:03:23", bgColor: "bg-[#ede9fe]" }
    // ]
    const colorList = ['bg-[#ccfbf1]', 'bg-[#dcfce7]', 'bg-[#fef3c7]', 'bg-[#ede9fe]', 'rgb(182, 180, 250)', 'bg-[#ede9fe]'];
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
                    projectName: `${item.projectnumber} ${item.description}`, taskName: item.name,
                    color: colorList[index], time: formatMilliseconds(item.spentTime)
                })
            })
        }

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
                <div className="strong" style={{ justifyContent: 'center' }}>
                    <div
                        style={{
                            margin: '2px 0',
                        }}
                    >
                        <span className='font-bold text-[16px]'>Ongoing Tasks</span>
                    </div>
                </div>
                <div className='grid justify-between mt-4' style={{ gridTemplateColumns: "48% 48%", rowGap: "20px" }}>
                    {assignedProject && assignedProject.map((item, index) => (
                        <div className={`grid p-5 border-1 rounded-lg ${item.color}`} style={{ rowGap: "15px" }} key={index}>
                            <span>{item.taskName}</span>
                            <div className='flex justify-between items-center'>
                                <span>{item.projectName}</span>
                                <span>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Col>
    );
}
