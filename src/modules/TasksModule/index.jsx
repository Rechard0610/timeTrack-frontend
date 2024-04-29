import { useLayoutEffect, useEffect, useState } from 'react';
import { Col, Button, Input, Select, Avatar, DatePicker } from 'antd';
import { UserAddOutlined, PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import CreateForm from '@/components/CreateForm';
import UpdateForm from '@/components/UpdateForm';
import DeleteModal from '@/components/DeleteModal';
import ReadItem from '@/components/ReadItem';
import SearchItem from '@/components/SearchItem';
import DataTable from '@/components/DataTable/DataTable';

import { useDispatch, useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';

import { CrudLayout } from '@/layout';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const TasksModule = () => {
    const translate = useLanguage();
    const [activeEmList, setActiveEmList] = useState(false);

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    return (
        <>
            <div>
                <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }}>
                    <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto auto minmax(auto, 140px)" }}>
                        <div className='grid gap-y-1.5'>
                            <p>Project</p>
                            <Select
                                variant="outlined"
                                className='min-w-48	outline-blue-500 min-h-10'
                                options={[
                                    {
                                        value: 'TimeTrack',
                                        label: 'TimeTrack',
                                    },
                                    {
                                        value: 'Extension',
                                        label: 'Extension',
                                    },
                                    {
                                        value: 'Blockchain',
                                        label: 'Blockchain',
                                    },
                                ]}
                            />
                        </div>
                        <div className='grid gap-y-1.5'>
                            <p>Assignee</p>
                            <div className='w-[40px]'>
                                <div className='relative'>
                                    <div className='user-select-btn' onClick={() => setActiveEmList(!activeEmList)}>
                                        <UserAddOutlined className='text-lg	text-emerald-400' />
                                    </div>
                                    {
                                        activeEmList === true &&
                                        <div className="user-select">
                                            <div className="user-select-list">
                                                <div className="user-select-search">
                                                    <div className="">
                                                        <Input addonBefore={<SearchOutlined />} placeholder="Search..." />
                                                    </div>
                                                </div>
                                                <div disabled="" className="user-select-item">
                                                    <div>
                                                        <Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                            style={{
                                                                verticalAlign: 'middle',
                                                            }}
                                                            size="middle"
                                                        />
                                                    </div>
                                                    <span className="sc-JrDLc bmdBHG">Byron Jett</span>
                                                </div>
                                                <div disabled="" className="user-select-item">
                                                    <div>
                                                        <Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=4"
                                                            style={{
                                                                verticalAlign: 'middle',
                                                            }}
                                                            size="middle"
                                                        />
                                                    </div>
                                                    <span className="sc-JrDLc bmdBHG">Byron Jett</span>
                                                </div>
                                                <div disabled="" className="user-select-item">
                                                    <div>
                                                        <Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                                                            style={{
                                                                verticalAlign: 'middle',
                                                            }}
                                                            size="middle"
                                                        />
                                                    </div>
                                                    <span className="sc-JrDLc bmdBHG">Byron Jett</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-y-1.5'>
                            <p>Search Task</p>
                            <Search placeholder="Search by task name ..." className='task-search' onSearch={onSearch} enterButton />
                        </div>
                        <div className='grid gap-y-1.5'>
                            <p>Status</p>
                            <Select
                                variant="outlined"
                                className='min-w-48	outline-blue-500 min-h-10'
                                options={[
                                    {
                                        value: 'To Do',
                                        label: 'To Do',
                                    },
                                    {
                                        value: 'Completed',
                                        label: 'Completed',
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <Button className='text-[white] bg-teal-300 min-h-10	px-8 cursor-pointer	mt-7 right'>
                        <PlusOutlined />Add Task
                    </Button>
                </div>
                <Col span={24}>
                    <div className="line"></div>
                </Col>
                <div className='grid bg-white rounded-lg p-6 mt-4'>
                    <div className='flex justify-between item-center gap-4' style={{gridAutoColumns:"auto auto"}}>
                        <div className='grid gap-2'>
                            <p class="min-h-10 text-[18px]">All Projects</p>
                        </div>
                        <Button className='text-[white] bg-slate-300 min-h-10 px-5 cursor-pointer'>
                            Export
                        </Button>
                    </div>
                    <CrudLayout
                        config={config}
                        fixHeaderPanel={<FixHeaderPanel config={config} />}
                        sidePanelBottomContent={
                            <CreateForm config={config} formElements={createForm} withUpload={withUpload} />
                        }
                        sidePanelTopContent={
                            <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} />
                        }
                        >
                        <DataTable config={config} />
                        <DeleteModal config={config} />
                    </CrudLayout>
                </div>
            </div>
        </>
    );
}

export default TasksModule;
