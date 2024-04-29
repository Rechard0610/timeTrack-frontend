import { useEffect, useLayoutEffect, useState } from 'react';
import { Col, DatePicker } from 'antd';

import DeleteModal from '@/components/DeleteModal';
import AssignPeople from '@/components/DataTable/AssignPeople';
import SelectAsync from '@/components/SelectAsync';
import SelectTask from '@/components/SelectTask'
import DateRangePicker from '@/components/DateRangePicker';

import { useDispatch, useSelector } from 'react-redux';

import useLanguage from '@/locale/useLanguage';
import { crud } from '@/redux/crud/actions';

import { CrudLayout } from '@/layout';
import TimeSheetTable from '@/components/TimeSheetCard/TimeSheetTable'

const TimeSheetModule = ({ config, createForm, updateForm, withUpload = false }) => {
    // const dispatch = useDispatch();
    const [filter, setFilter] = useState({ userId: '', projectId: '', taskId: '', startDay: '', endDay: '' })

    useEffect(() => {
        // dispatch(crud.resetState());
        // Get the current date
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        // Array to store the days of the week
        const daysOfWeek = [];

        // Generate the days of the week for the current week
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            daysOfWeek.push(day);
        }
    
        const padZero = (num) => (num < 10 ? `0${num}` : num); // Function to pad single digit numbers with leading zero
    
        const startDay = `${daysOfWeek[0].getFullYear()}-${padZero(daysOfWeek[0].getMonth() + 1)}-${padZero(daysOfWeek[0].getDate())}`;
        const endDay = `${daysOfWeek[6].getFullYear()}-${padZero(daysOfWeek[6].getMonth() + 1)}-${padZero(daysOfWeek[6].getDate())}`;
        setSelectedDays(daysOfWeek);
            setFilter({ ...filter, startDay: startDay, endDay: endDay });
    }, []);

    const [parentId, setParentId] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

    const handleChangeProject = (value) => {
        setParentId(value);
        setFilter({ ...filter, projectId: value });
    }

    const handleChangeTask = (value) => {
        if(value == null)
            return;
        console.log(value);
        filter.taskId = value;
        setFilter({ ...filter, taskId: value });
    }

    const handleChangeRange = (dates, dateStrings) => {
        if (dates) {
            if (dates.length === 2) {
                const startDate = dates[0];
                const endDate = dates[1];
                const datesArray = [];
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    datesArray.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setSelectedDays(datesArray);
            }
            // console.log('From: ', dates[0], ', to: ', dates[1]);
            // console.log('From: ', dateStrings[0], ', to: ', cx);
            setFilter({ ...filter, startDay: dateStrings[0], endDay: dateStrings[1] });
        } else {
            console.log('Clear');
        }
    };

    const handleChangePeople = (value) => {
        setFilter({ ...filter, userId: value });
    }

    return (
        <>
            <div>
                <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto auto minmax(auto, 140px)" }}>
                    <div className='grid gap-y-1.5'>
                        <p>Project</p>
                        <SelectAsync
                            className="min-w-48	outline-blue-500 min-h-10"
                            entity='project'
                            showAll='true'
                            displayLabels={['projectnumber']}
                            onChange={handleChangeProject}
                        ></SelectAsync>
                    </div>
                    <div className='grid gap-y-1.5'>
                        <p>Task</p>
                        <SelectTask
                            className="min-w-48	outline-blue-500 min-h-10"
                            entity='task'
                            showAll='true'
                            displayLabels={['name', 'lastname']}
                            parentId={parentId}
                            onChange={handleChangeTask}
                        />
                    </div>
                    <div className='grid gap-y-1.5'>
                        <p>Assigne</p>
                        <div className='w-[40px]'>
                            <div className='relative assign-btn'>
                                <AssignPeople onChange={handleChangePeople} showAll='true' />
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-y-1.5'>
                        <p>Date Range</p>
                        <DateRangePicker onRangeChange={handleChangeRange} />
                    </div>
                </div>
            </div>
            <Col span={24}>
                <div className="line"></div>
            </Col>
            <CrudLayout
                config={config}
            >
                <TimeSheetTable config={config} selectedDays={selectedDays} conditions={filter} />
                <DeleteModal config={config} />
            </CrudLayout>
        </>
    );
}

export default TimeSheetModule;
