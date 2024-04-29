import { Table, Button, Col, Row, Space, Select, Popconfirm, Input, TimePicker } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import { useCrudContext } from '@/context/crud';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

const options = [
    { label: 'Productive', value: 'Productive' },
    { label: 'Neutral', value: 'Neutral' },
    { label: 'Unproductive', value: 'Unproductive' },
];

export default function ApprovalTable({ config, selectedListItems, handelDataTableLoad, approve,
    declien, currentStatus, extra = [] }) {

    let { dataTableColumns, fields, entity } = config;
    const translate = useLanguage();
    const { moneyFormatter } = useMoney();
    const { dateFormat } = useDate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel } = crudContextAction;
    const isEditing = (record) => record.key === editingKey;

    const { result: listResult, isLoading: listIsLoading } = selectedListItems;

    const { pagination, items: dataSource } = listResult;
    const [tableData, setTableData] = useState();
    const [initialTableData, setInitialTableData] = useState([]);

    const formatTimeFromSeconds = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const formattedHours = hours === 0 ? '00:' : `${hours}:`;
        const formattedMinutes = `${minutes}`;

        return `${formattedHours}${formattedMinutes}`;
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        record,
        index,
        children,
        ...restProps
    }) => {
        const updatedRecord = { ...record }
        let inputNode;
        const handleChangeEditable = (e, timeString) => {
            if (title === 'Percentage') {
                updatedRecord['percentage'] = e.target.value;
                const billabletime = updatedRecord['totalTimeRange'] / 100 * Number(e.target.value);
                updatedRecord['billabletime'] = formatTimeFromSeconds(billabletime);
            } else {
                updatedRecord['billabletime'] = timeString;
                const [hoursStr, minutesStr] = timeString.split(':'); // Split the time string into hours and minutes
                const hours = parseInt(hoursStr, 10); // Parse hours as an integer
                const minutes = parseInt(minutesStr, 10); // Parse minutes as an integer
                const totalSeconds = hours * 3600 + minutes * 60;
                const timeRange = updatedRecord['totalTimeRange'] - updatedRecord['totalTimeRange'] % 60;
                updatedRecord['percentage'] = (totalSeconds * 100 / timeRange) != 0 ? (totalSeconds * 100 / timeRange).toFixed(2) : 0
            }
            const updatedTableData = tableData.map(item => {
                return item._id.userId === updatedRecord._id.userId &&
                    item._id.projectId === updatedRecord._id.projectId &&
                    item._id.taskId === updatedRecord._id.taskId ? updatedRecord : item
            })

            setTableData(updatedTableData);
        }
        const billableTime = updatedRecord && updatedRecord['billabletime'];
        inputNode = title === 'Percentage' ? <Input onBlur={handleChangeEditable} defaultValue={updatedRecord && updatedRecord['percentage'] === undefined ? 0 : String(updatedRecord['percentage'])} style={{ width: 90 }} suffix='%' disabled={currentStatus != 'pending'} /> //  
            : <TimePicker onChange={handleChangeEditable} defaultValue={billableTime !== undefined ? dayjs(billableTime, 'HH:mm') : null} style={{ width: 90 }}
                format="HH:mm" showNow={false} needConfirm={false} disabled={currentStatus != 'pending'} /> // 
        return (
            <td {...restProps}>
                {editing ? (
                    inputNode
                ) : (
                    children
                )}
            </td>
        );
    }

    let dispatchColumns = [];
    if (fields) {
        dispatchColumns = [...dataForTable({ fields, translate, moneyFormatter, dateFormat })];
    } else {
        dispatchColumns = [...dataTableColumns];
    }

    const handleSelectChange = (value, record) => {
        let data = tableData;

        if (selectedRows.length > 0) {
            const updatedRows = selectedRows.map((row) =>
                row._id === record._id ? { ...row, productive: value } : row
            );
            setSelectedRows(updatedRows);
        }
        data = data.map(item => {
            console.log(item);
            console.log(record);
            console.log(value);
            return item._id === record._id ? { ...item, productive: value } : item
        });
        console.log(data);
        setTableData(data);
    };

    useEffect(() => {
        setInitialTableData(dataSource);
        setTableData(dataSource);
        setSelectedRows([])
    }, [dataSource])

    dataTableColumns = [
        ...dispatchColumns,
        {
            title: 'Productive',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <Select
                        variant={false}
                        size='middle'
                        defaultValue={record.productive}
                        style={{
                            width: 130,
                        }}
                        disabled={currentStatus !== 'pending'}
                        options={options}
                        onChange={(value) => handleSelectChange(value, record)}
                    />
                </Space>
            ),
        },
        Table.SELECTION_COLUMN,
    ];

    if (entity !== 'manualtime') {
        dataTableColumns = dataTableColumns.filter(column => column.key !== 'operation');
        dataTableColumns = dataTableColumns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: col.editable,
                }),
            };
        });
    }

    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (entity === 'weeklytime') {
                const billableTimeMap = {};
                selectedRows.map(item => {
                    const projectId = item._id.projectId;
                    let billableTime = 0;
                    if (item.billabletime != undefined) {
                        const [hoursStr, minutesStr] = item.billabletime.split(':'); // Split the time string into hours and minutes
                        const hours = parseInt(hoursStr, 10); // Parse hours as an integer
                        const minutes = parseInt(minutesStr, 10); // Parse minutes as an integer
                        billableTime = hours * 3600 + minutes * 60
                    }
                    billableTimeMap[projectId] = (billableTimeMap[projectId] || 0) + billableTime;
                })

                const data = tableData.map((item, index) => {
                    const projectId = item._id.projectId;
                    let billableTime = initialTableData[index].totalBillableTime;
                    const totalBillableTime = (billableTimeMap[projectId] || 0) + billableTime;
                    return { ...item, totalBillableTime };
                })

                const selectedItems = selectedRows.map(item => {
                    const projectId = item._id.projectId;
                    const taskId = item._id.taskId;
                    const userId = item._id.userId;
                    const initialValue = (initialTableData.find((res) => res._id.projectId === projectId
                        && res._id.userId === userId && res._id.taskId === taskId)?.totalBillableTime || 0);
                    if (billableTimeMap[projectId] !== undefined) {
                        const billableTime = (billableTimeMap[projectId] || 0) + initialValue;
                        return { ...item, totalBillableTime: billableTime };
                    }
                    return item;
                })

                setTableData(data);
                setSelectedRows(selectedItems);
            } else {
                setSelectedRows(selectedRows)
            }
        },
        getCheckboxProps: (record) => ({}
            // Add any custom props here
        ),
    };

    const handleApprove = () => {
        approve(selectedRows);
        setSelectedRows([]);
    }

    const handleDecline = () => {
        declien(selectedRows);
        setSelectedRows([]);
    }

    const handleCreateNew = () => {
        panel.open();
        collapsedBox.close();
    }

    return (
        <>
            <Row justify='start' className='pb-4'>
                <Col span={2}>
                    {(entity === 'payment' || entity === 'income') &&

                        <Button className='bg-teal-300 text-[white]'
                            onClick={handleCreateNew}>
                            {translate('Create')}
                        </Button>
                    }
                </Col>
                <Col span={22}> {/* This will occupy the remaining space */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Popconfirm
                            title="Decline"
                            description="Are you sure to decline these?"
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ className: 'bg-teal-300' }}
                            onConfirm={handleDecline}
                        >
                            <Button className='bg-orange-400 text-[white] mr-5'
                                disabled={currentStatus !== 'pending' || selectedRows.length === 0}>
                                {translate('Decline')}
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Approve"
                            description="Are you sure to approve these?"
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ className: 'bg-teal-300' }}
                            onConfirm={handleApprove}
                        >
                            <Button className='bg-green-300 text-[white]'
                                disabled={currentStatus !== 'pending' || selectedRows.length === 0}>
                                {translate('Approve')}
                            </Button>
                        </Popconfirm>
                    </div>
                </Col>
            </Row>
            <Table
                components={components}
                columns={dataTableColumns}
                rowKey={(item, index) => entity === 'weeklytime' ? `${item._id.userId}${item.totalTimeRange}-${index}` : item._id}
                rowSelection={currentStatus === 'pending' ? { ...rowSelection, type: 'checkbox' } : null}
                dataSource={tableData}
                pagination={pagination}
                loading={listIsLoading}
                onChange={handelDataTableLoad}
                scroll={{ x: true }}
            />
        </>
    );
}
