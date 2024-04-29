import { useCallback, useEffect, useState } from 'react';

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Form, Table, Typography, Input, Popconfirm, InputNumber } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { request } from '@/request';

export default function EditableTable({ config, extra = [] }) {
    let { lunchEntity, dataTableColumns, lunchFields } = config;
    const [form] = Form.useForm();
    const translate = useLanguage();
    const { moneyFormatter } = useMoney();
    const { dateFormat } = useDate();
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [editingKey, setEditingKey] = useState('');
    const [editTableData, setEditTableData] = useState([]);
    const isEditing = (record) => record.userId._id === editingKey;


    const getRangeOfStartAndEndDay = () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setUTCHours(0, 0, 0, 0);
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const range = { startDate: startOfWeek, endDate: endOfWeek }
        return range;
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const handleEdit = (record) => {
        form.setFieldsValue({
            mon: '',
            tue: '',
            wed: '',
            thu: '',
            fri: '',
            sat: '',
            sun: '',
            ...record,
        });
        console.log(record.userId._id);
        setEditingKey(record.userId._id);
    };
    const handleCancel = () => {
        setEditingKey('');
    };
    const handleSave = async (record) => {
        try {
            const row = await form.validateFields();
            const jsonData = row;
            jsonData.userId = record.userId._id;
            const id = record._id
            await request.update({ entity: lunchEntity, id, jsonData });
            setEditingKey('');
            form.resetFields()
            dispatcher();

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    let dispatchColumns = [];
    if (lunchFields) {
        dispatchColumns = [...dataForTable({ fields: lunchFields, translate, moneyFormatter, dateFormat })];
    } else {
        dispatchColumns = [...dataTableColumns];
    }

    dataTableColumns = [
        ...dispatchColumns,
        {
            title: 'Action',
            key: 'operation',
            width: 140,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => handleSave(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        }
    ];

    if (currentAdmin.role != 'owner') {
        dataTableColumns = dataTableColumns.filter(column => column.key !== 'operation');
    }

    // const handelDataTableLoad = useCallback( async (pagination) => {
    //     const range = getRangeOfStartAndEndDay();
    //     const options = {
    //         page: pagination.current || 1, items: pagination.pageSize || 10,
    //         userId: currentAdmin._id, startDate: range.startDate, endDate: range.endDate
    //     };
    //     const data = await request.list({ entity, options });
    //     setEditTableData(data);
    // }, []);

    const dispatcher = async () => {
        const range = getRangeOfStartAndEndDay();
        const options = { userId: currentAdmin._id, startDate: range.startDate, endDate: range.endDate };
        const data = await request.list({ entity: lunchEntity, options });
        console.log(data?.result);
        setEditTableData(data?.result);
    };

    const createLunchTable = async () => {
        const jsonData = { userId: currentAdmin._id,  };
        await request.create({ entity: lunchEntity, jsonData })
    }

    useEffect(() => {
        const controller = new AbortController();
        const initializeData = async () => {
            try {
                await createLunchTable();
                await dispatcher();
            } catch (error) {
                console.error("Error initializing data:", error);
            }
        };

        initializeData();
        return () => {
            controller.abort();
        };
    }, []);

    const mergedColumns = dataTableColumns.map((col) => {
        if (!col || !col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: { cell: EditableCell, },
                    }}
                    columns={mergedColumns}
                    rowKey={(item) => item.userId._id}
                    dataSource={editTableData}
                    rowClassName="editable-row"
                    scroll={{ x: true }}
                />
            </Form >
        </>
    );
}
