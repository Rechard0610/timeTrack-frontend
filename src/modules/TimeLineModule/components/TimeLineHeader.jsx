import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import AssignPeople from '@/components/DataTable/AssignPeople';
import { Row, Col, Button, Input, TimePicker, Modal, Form } from 'antd';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { request } from '@/request';

import SelectAsync from '@/components/SelectAsync';
import SelectTask from '@/components/SelectTask'

const { TextArea } = Input;

const TimeLineHeader = ({ onChange }) => {
    const entity = 'manualtime'
    const format = 'HH:mm';
    let productivityOptions = ['Productivity', 'Neutral', 'Unproductive'];
    const currentAdmin = useSelector(selectCurrentAdmin);

    const [filter, setFilter] = useState({ user: currentAdmin._id, date: new Date() });
    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState('');
    const [taskId, setTaskId] = useState('');
    const [selectedProductive, setSelectedProductive] = useState('');
    const [form] = Form.useForm();
    // const handleChangePeople = (value) => {
    //     if (value === 'all') {
    //         filter.user = currentAdmin._id;
    //     } else {
    //         filter.user = value;
    //     }
    //     setFilter(filter);
    //     onChange(filter);
    // }

    // const handleChangeDate = (date, dateString) => {
    //     filter.date = dateString;
    //     setFilter(filter);
    //     onChange(filter);
    // }

    const handleCreateManual = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleChangeProject = (value) => {
        setProjectId(value);
    }

    const onSubmit = async (fieldsValue) => {
        const jsonData = fieldsValue;
        console.log("=============================");
        jsonData.userId = currentAdmin._id;
        const data = await request.create({ entity, jsonData });
        form.resetFields();
        setOpen(false);
    }

    return (
        <div>
            {/* {
                currentAdmin.role === 'owner' && < div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto" }}>
                    <div className='grid gap-y-1.5'>
                        <p>Select Date</p>
                        <DatePicker presets={[
                            {
                                label: 'Today',
                                value: dayjs().add(0, 'd'),
                            },
                            {
                                label: 'Yesterday',
                                value: dayjs().add(-1, 'd'),
                            },
                            {
                                label: 'Last Week',
                                value: dayjs().add(-7, 'd'),
                            },
                            {
                                label: 'Last Month',
                                value: dayjs().add(-1, 'month'),
                            },
                        ]}
                            size='middle' onChange={handleChangeDate}
                            showToday={false}
                        />
                    </div>
                    <div className='grid gap-y-1.5'>
                        <p>Assigne</p>
                        <div className='w-[40px]'>
                            <div className='relative assign-btn'>
                                <AssignPeople onChange={handleChangePeople} value={currentAdmin._id} />
                            </div>
                        </div>
                    </div>
                </div>
            } */}
            {
                currentAdmin.role === 'owner' &&
                < div className='grid gap-x-5 pb-3 justify-end'>
                    <div className='grid gap-y-1.5'>
                        <Button onClick={handleCreateManual} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
                            Create Manual Time
                        </Button>
                    </div>
                </div>
            }
            <Col span={24}>
                <div className="line"></div>
            </Col>
            <Modal
                open={open}
                title="Add Manual Time"
                onCancel={handleCancel}
                footer={null}
            >
                {/* <p>Adjust, specify or delete the whole tracked time period or parts of it.</p> */}
                <Form
                    form={form} layout="vertical" onFinish={onSubmit}
                >
                    <Row justify="center" align="middle">
                        <Col span={9} >
                            <Form.Item
                                label="Start Time"
                                name="starttime"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input Start Time!',
                                    },
                                ]}
                            >
                                <TimePicker
                                    format={format}
                                    needConfirm={false}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{ textAlign: 'center' }}> {/* Add a 1-span Col for spacing */}
                            {/* Leave this Col empty or add any content for spacing */}
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                label="End Time"
                                name="endtime"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input End Time!',
                                    },
                                ]}
                                style={{ textAlign: 'right!important' }}
                            >
                                <TimePicker
                                    format={format}
                                    needConfirm={false}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Reason"
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Reason!',
                            },
                        ]}
                    >
                        <TextArea rows={3} placeholder='Reason' />
                    </Form.Item>
                    <Form.Item
                        label="Project"
                        name="project"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Project!',
                            },
                        ]}
                    >
                        <SelectAsync
                            className="min-w-48	outline-blue-500 min-h-10"
                            entity='project'
                            displayLabels={['projectnumber']}
                            onChange={handleChangeProject}
                            value={projectId}
                        ></SelectAsync>
                    </Form.Item>
                    <Form.Item
                        label="Task"
                        name="task"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Task!',
                            },
                        ]}
                    >
                        <SelectTask
                            className="min-w-48	outline-blue-500 min-h-10"
                            entity='task'
                            displayLabels={['name', 'lastname']}
                            parentId={projectId}
                            value={taskId}
                        ></SelectTask>
                    </Form.Item>
                    {/* <Form.Item
                        className='text-center py-5'
                        name="productive"
                    >
                        <Radio.Group
                            defaultValue='Productivity'
                            options={productivityOptions}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item> */}
                    <Row justify='end'>
                        <Col span={5}>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    paddingLeft: '5px',
                                }}
                            >
                                <Button onClick={handleCancel}>Cancel</Button>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    paddingRight: '5px',
                                }}
                            >
                                <Button type="primary" htmlType="submit" className='bg-teal-300'>
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </div >
    );
}

export default TimeLineHeader;