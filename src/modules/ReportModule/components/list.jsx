import { Row, Col } from 'antd';
import Card from './Card'

const List = ({ label, value }) => {
    const data = {
        userName: 'Artis Agrums',
        shortName: 'AAG',
        level: 'Engineers, Management',
        projectHours: 12,
        taskHours: 55,
        projectSpent: 12,
        taskSpent: 32,
        projectRemaining: 12,
        taskRemainig: 32,
        assignedProject: 15,
        assignedTasks: 38
    }
    return (
        <div className='py-5'>
            <div className='flex justify-between'>
                <p>{data.userName}</p>
                <p>{data.shortName}</p>
            </div>
            <div className='flex justify-between'>
                <p>{data.level}</p>
            </div>
            <div className='grid justify-start' style={{ gridTemplateColumns: "40% 30% 30%" }}>
                <p></p>
                <p>Project</p>
                <p>Task</p>
            </div>
            <div className='grid justify-start' style={{ gridTemplateColumns: "40% 30% 30%" }}>
                <p className='text-start'>Hours:</p>
                <p>{data.projectHours}</p>
                <p>{data.taskHours}</p>
            </div>
            <div className='grid justify-start' style={{ gridTemplateColumns: "40% 30% 30%" }}>
                <p className='text-start'>Spent:</p>
                <p>{data.projectSpent}</p>
                <p>{data.taskSpent}</p>
            </div>
            <div className='grid justify-start' style={{ gridTemplateColumns: "40% 30% 30%" }}>
                <p className='text-start'>Remain:</p>
                <p>{data.projectRemaining}</p>
                <p>{data.taskRemainig}</p>
            </div>
            <div className='flex justify-between'>
                <p>Assigned Project:</p>
                <p>{data.assignedProject}</p>
            </div>
            <div className='flex justify-between'>
                <p>Assigned Tasks:</p>
                <p>{data.assignedTasks}</p>
            </div>
        </div>
    )
}

export default List;