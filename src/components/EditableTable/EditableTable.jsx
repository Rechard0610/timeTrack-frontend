import { useCallback, useEffect, useState } from 'react';
import { Form, Table, Typography, Input, Popconfirm, InputNumber, Button, Row, Col } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { request } from '@/request';

export default function EditableTable({ config, getTableData, extra = [] }) {
    let { lunchEntity, dataTableColumns, lunchFields } = config;
    const [form] = Form.useForm();
    const translate = useLanguage();
    const { moneyFormatter } = useMoney();
    const { dateFormat } = useDate();
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [editTableData, setEditTableData] = useState([]);

    const isEditing = (record) => record.userId._id === editingKey;


    const getRangeOfStartAndEndDay = () => { // get startDay and endDay of last week
        const today = new Date();
        const startOfLastWeek = new Date(today);
        startOfLastWeek.setDate(today.getDate() - today.getDay() - 6);
        startOfLastWeek.setUTCHours(0, 0, 0, 0);
        const endOfLastWeek = new Date(today);
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
        const range = { startDate: startOfLastWeek, endDate: endOfLastWeek }
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
        setEditingKey(record.userId._id);
    };
    const handleCancel = () => {
        setEditingKey('');
    };
    const handleSave = async (record) => {
        try {
            const row = await form.validateFields();
            const jsonData = row;
            const id = record._id;
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
        },
        Table.SELECTION_COLUMN,
    ];

    if (currentAdmin.role != 'owner') {
        dataTableColumns = dataTableColumns.filter(column => column.key !== 'operation');
    }

    const dispatcher = async () => {
        const range = getRangeOfStartAndEndDay();
        const options = { userId: currentAdmin._id, startDate: range.startDate, endDate: range.endDate };
        const data = await request.list({ entity: lunchEntity, options });
        console.log(data);
        getTableData(data?.result);
        setEditTableData(data?.result);
    };

    useEffect(() => {
        const controller = new AbortController();
        dispatcher();
        return () => {
            controller.abort();
        };
    }, []);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record) => ({}
            // Add any custom props here
        ),
    };

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

    const handleConfirm = async () => {
        try {
            const jsonData = { selectedRows, type: 'approved', recipient: currentAdmin._id };
            await request.updateAll({ entity: lunchEntity, jsonData });
            dispatcher();

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    return (
        <>
            <Form form={form} component={false}>
                <Row justify='end' className='pb-4'>
                    <Col span={2}>
                        <Popconfirm
                            title="Confirm"
                            description="Are you sure to confirm these?"
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ className: 'bg-teal-300' }}
                            onConfirm={handleConfirm}
                        >
                            <Button className='bg-teal-300 text-[white] mr-5'
                                disabled={selectedRows.length === 0}>
                                {translate('Confirm')}
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <Table
                    components={{
                        body: { cell: EditableCell, },
                    }}
                    rowSelection={{ ...rowSelection, type: 'checkbox' }}
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
