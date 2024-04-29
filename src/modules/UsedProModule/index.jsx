import { useLayoutEffect, useEffect, useState } from 'react';
import { Col, Button, Select, Avatar, Input, } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import UsedAppCard from '@/components/UsedAppCard'
import AssignPeople from '@/components/DataTable/AssignPeople'
import SelectAsync from '@/components/SelectAsync';
import useLanguage from '@/locale/useLanguage';
import DateRangePicker from '@/components/DateRangePicker';

const UsedProModule = ({ config }) => {
    const translate = useLanguage();
    const [filter, setFilter] = useState({project: '', user: '', startDay: '', endDay: ''});

    const handleChangeProject = (value) => {
        setFilter({ ...filter, project: value });
    }

    const handleChangePeople = (value) => {
        setFilter({ ...filter, user: value });
    }

    const handleChangeRange = (dates, dateStrings) => {
        setFilter({ ...filter, startDay: dateStrings[0], endDay: dateStrings[1] });
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
                            displayLabels={['projectnumber', 'lastname']}
                            onChange={handleChangeProject}
                        ></SelectAsync>
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
            <div className='grid bg-white rounded-lg p-6 mt-4'>
                <div className='flex justify-between item-center gap-4' style={{ gridAutoColumns: "auto auto" }}>
                    <div className='grid gap-2'>
                        <p className="min-h-10 text-[18px]">All Projects</p>
                    </div>
                    <Button className='text-[white] bg-slate-300 min-h-10 px-5 cursor-pointer'>
                        Export
                    </Button>
                </div>
                <UsedAppCard config={config} conditions={filter} />
            </div>
        </>
    );
}

export default UsedProModule;
