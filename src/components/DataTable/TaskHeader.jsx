import { useCallback, useEffect, useState } from 'react';

import {
    UserAddOutlined,
} from '@ant-design/icons';
import { Button, Input, Select, Avatar } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';
import AssignPeople from './AssignPeople';
import SelectAsync from '@/components/SelectAsync';
import DateRangePicker from '@/components/DateRangePicker';

const { Search } = Input;

function AddTask({ config }) {
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel } = crudContextAction;

    const handelClick = () => {
        panel.open();
        collapsedBox.close();
    };

    return (
        <Button onClick={handelClick} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
            Add Task
        </Button>
    );
}

export default function TaskHeader({ config, filterTable }) {
    let { searchConfig } = config;
    const [options, setOptions] = useState({ q: '', fields: searchConfig.searchFields, startDay: '', endDay: '', status: '', sort: -1, project: '', userId: '', client: '' });


    const handleChangeClient = (value) => {
        options.client = value;
        filterTable(options);
    }

    const handleChangeProject = (value) => {
        options.project = value;
        filterTable(options);
    }

    const handleChangeSort = (value) => {
        options.sort = value;``
        filterTable(options);
    }

    const handleChangeRange = (dates, dateStrings) => {
        console.log(dateStrings);
        options.startDay = dateStrings[0];
        options.endDay = dateStrings[1];
        console.log(options);
        filterTable(options);
    }

    const handleChangeStatus = (value) => {
        options.status = value;
        filterTable(options);
    }

    const handleSearch = (value) => {
        options.q = value;
        filterTable(options);
    }

    const handleChangePeople = (value) => {
        options.userId = value;
        filterTable(options);
    }

    return (
        <>
            <PageHeader
                title=""
                extra={[
                    <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1}>
                        <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto auto auto auto minmax(auto, 370px)" }}>
                            <div className='grid gap-y-1.5'>
                                <p>Client</p>
                                <SelectAsync
                                    className="min-w-40	outline-blue-500 min-h-10"
                                    entity='client'
                                    showAll='true'
                                    displayLabels={['name', 'lastname']}
                                    onChange={handleChangeClient}
                                ></SelectAsync>
                            </div>
                            <div className='grid gap-y-1.5'>
                                <p>Project</p>
                                <SelectAsync
                                    className="min-w-40	outline-blue-500 min-h-10"
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
                                <p>Status</p>
                                <Select
                                    variant="outlined"
                                    className='min-w-40	outline-blue-500 min-h-10'
                                    placeholder="Status"
                                    onChange={handleChangeStatus}
                                    options={[
                                        { value: '', label: 'All' },
                                        { value: 'In Quatation', label: 'In Quatation' },
                                        { value: 'In Progress', label: 'In Progress' },
                                        { value: 'Finished', label: 'Finished' },
                                        { value: 'Stalled', label: 'Stalled' }
                                    ]}
                                />
                            </div>
                            <div className='grid gap-y-1.5'>
                                <p>Date Range</p>
                                <DateRangePicker onRangeChange={handleChangeRange} />
                            </div>
                            <div className='grid gap-y-1.5'>
                                <p>Sory By</p>
                                <Select
                                    variant="outlined"
                                    className='min-w-40	outline-blue-500 min-h-10'
                                    defaultValue='-1'
                                    onChange={handleChangeSort}
                                    options={[
                                        {
                                            value: '-1',
                                            label: 'Date(New to old)',
                                        },
                                        {
                                            value: '1',
                                            label: 'Date(old to New)',
                                        }
                                    ]}
                                />
                            </div>
                            <div className='grid gap-y-1.5'>
                                <p>Search Task</p>
                                <Search placeholder="Search by task name ..." className='task-search' onSearch={handleSearch} enterButton />
                            </div>
                        </div>
                    </div>,
                    <AddTask key={`${uniqueId()}`} config={config} />,
                    // </div >
                ]
                }
                style={{
                    padding: '20px 0px',
                }}
            ></PageHeader >
        </>
    );
}
