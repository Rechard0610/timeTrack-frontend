import { useState } from 'react';

import { Button, Input, Select, Segmented } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';
import SelectAsync from '@/components/SelectAsync';
import DateRangePicker from '@/components/DateRangePicker';
import AssignPeople from '@/components/DataTable/AssignPeople';

const { Search } = Input;

export default function ExportHeader({ config, filterTable }) {
    // let { searchConfig } = config;
    let searchConfig = '';
    const translate = useLanguage();
    const [options, setOptions] = useState({ q: '', fields: searchConfig.searchFields, startDay: '', endDay: '', status: '', sort: -1, client: '' });

    const handleChangeClient = (value) => {
        options.client = value;
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

    const handleChangeProject = (value) => {
        options.project = value;
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
                    <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1} >
                        <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto auto auto auto minmax(auto, 540px)" }}>
                            <div className='grid gap-y-1.5'>
                                <p>Client</p>
                                <SelectAsync
                                    className="min-w-48	outline-blue-500 min-h-10"
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
                                    className='min-w-48	outline-blue-500 min-h-10'
                                    placeholder="Status"
                                    defaultValue=''
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
                            {/* <div className='grid gap-y-1.5'>
                                <p>Sory By</p>
                                <Select
                                    variant="outlined"
                                    className='min-w-48	outline-blue-500 min-h-10'
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
                            </div> */}
                            <div className='grid gap-y-1.5'>
                                <p>Search Project</p>
                                <Search placeholder="Search by project name ..." className='task-search' onSearch={handleSearch} enterButton />
                            </div>
                        </div>
                    </div>,
                ]}
                style={{
                    padding: '20px 0px',
                }}
            ></PageHeader>
        </>
    );
}
