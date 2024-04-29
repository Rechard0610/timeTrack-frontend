import { Table, Button, Col, Row, Space, Select, Popconfirm, Input, TimePicker, Typography } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import { useSelector, useDispatch } from 'react-redux';
import { useCrudContext } from '@/context/crud';
import { useEffect, useState } from 'react';
import { crud } from '@/redux/crud/actions';

export default function PaymentTable({ config, selectedListItems, handelDataTableLoad, approve,
    declien, currentStatus, extra = [] }) {

    let { dataTableColumns, fields, entity } = config;
    const translate = useLanguage();
    const dispatch = useDispatch();
    const { moneyFormatter } = useMoney();
    const { dateFormat } = useDate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel, editBox } = crudContextAction;
    const isEditing = (record) => record.key === editingKey;

    const { result: listResult, isLoading: listIsLoading } = selectedListItems;

    const { pagination, items: dataSource } = listResult;
    const [tableData, setTableData] = useState();

    let dispatchColumns = [];
    if (fields) {
        dispatchColumns = [...dataForTable({ fields, translate, moneyFormatter, dateFormat })];
    } else {
        dispatchColumns = [...dataTableColumns];
    }

    useEffect(() => {
        setTableData(dataSource);
        setSelectedRows([])
    }, [dataSource])

    const handleEdit = (record) => {
        dispatch(crud.currentItem({ data: record }));
        dispatch(crud.currentAction({ actionType: 'update', data: record }));
        editBox.open();
        panel.open();
        collapsedBox.open();
    }

    dataTableColumns = [
        ...dispatchColumns,
        {
            title: 'Action',
            key: 'operation',
            render: (_, record) => {
                return (
                    <Typography.Link disabled={currentStatus !== 'pending'} onClick={() => handleEdit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        Table.SELECTION_COLUMN,
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows)
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
                            onClick={handleCreateNew} disabled={currentStatus !== 'pending'}>
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
                columns={dataTableColumns}
                rowKey={(item, index) => item._id}
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
