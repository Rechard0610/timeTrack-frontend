import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card } from 'antd';
import useOnFetch from '@/hooks/useOnFetch';
import TimeLineChart from './components/TimeLineChart';
import DeskTime from './components/desktime';
import TimeLineHeader from './components/TimeLineHeader'
import ProjectDescription from './components/projectDescription';
import ResizableChart from '@/modules/DashboardModule/components/ResizableChart'
import UsedAppCard from '@/components/UsedAppCard'
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import Loading from '@/components/Loading';

export default function TimeLinedModule() {
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [currentUser, setCurrentUser] = useState(currentAdmin._id);
    const [selectedDate, setCurrentDate] = useState(new Date());
    const [condition, setCondition] = useState({ project: '', user: currentUser, startDay: new Date(), endDay: new Date() });
    const config = { entity: 'survey' }

    const { onFetch, isSuccess, isLoading } = useOnFetch();

    const handleChangeDate = (filter) => {
        setCurrentUser(filter.user);
        setCurrentDate(new Date(filter.date));
        // condition.user = filter.user;
        // condition.startDay = new Date(filter.date);
        // condition.endDay = new Date(filter.date);
        // setCondition(condition);
        setCondition({ ...condition, user: filter.user, startDay: new Date(filter.date), endDay: new Date(filter.date) });
    }

    return (
        <Loading isLoading={isLoading}>
            <TimeLineHeader onChange={handleChangeDate} />
            <DeskTime currentUser={currentUser} selectedDate={selectedDate} />
            <Card className='mb-5'>
                <TimeLineChart currentUser={currentUser} selectedDate={selectedDate} />
            </Card>
            <Card className='mb-5'>
                <ProjectDescription currentUser={currentUser} selectedDate={selectedDate} />
            </Card>
            <Card className='mb-5'>
                <Row gutter={[32, 32]}>
                    <ResizableChart status='Finished' dateRange='month' userId={currentUser} selectedDate={selectedDate} />
                    <ResizableChart status='In Progress' userId={currentUser} selectedDate={selectedDate} />
                </Row>
            </Card>
            <Card className='mb-5'>
                <UsedAppCard config={config} conditions={condition} isEdit={false} />
            </Card>
        </Loading>
    );
}
