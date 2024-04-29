import { useCallback, useEffect } from 'react';

import {
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { Dropdown, Table, Button, Space, Badge, Switch } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';

import { useCrudContext } from '@/context/crud';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

export default function SettingTable({ config, extra = [] }) {
    let { entity, dataTableColumns, fields, searchConfig } = config;
    const { crudContextAction } = useCrudContext();
    const currentAdmin = useSelector(selectCurrentAdmin);
    const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;
    const translate = useLanguage();
    const { moneyFormatter } = useMoney();
    const { dateFormat } = useDate();

    function handleEdit(record) {
        dispatch(crud.currentItem({ data: record }));
        dispatch(crud.currentAction({ actionType: 'update', data: record }));
        editBox.open();
        panel.open();
        collapsedBox.open();
    }

    let dispatchColumns = [];
    if (fields) {
        dispatchColumns = [...dataForTable({ fields, translate, moneyFormatter, dateFormat })];
    } else {
        dispatchColumns = [...dataTableColumns];
    }

    dataTableColumns = [
        ...dispatchColumns,
    ];

    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

    const { pagination, items: dataSource } = listResult;

    const dispatch = useDispatch();

    const handelDataTableLoad = useCallback((pagination) => {
        const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
        dispatch(crud.list({ entity, options }));
    }, []);

    const searchTable = (value) => {
        const options = { q: value, fields: searchConfig?.searchFields || '' };
        dispatch(crud.list({ entity, options }));
    };

    const filterTable = (options) => {

        dispatch(crud.list({ entity, options }));
    };

    const dispatcher = () => {
        const options = { userId: currentAdmin._id };
        dispatch(crud.list({ entity, options }));
    };

    useEffect(() => {
        const controller = new AbortController();
        dispatcher();
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
                inputType: 'boolean',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: true,
            }),
        };
    });

    const handleChange = async (checked, record, dataIndex) => {
        let dispatchAction;
        if (record._id) { //update
            const id = record._id;
            const jsonData = {index: dataIndex, checked};
            dispatch(crud.update({ entity, id, jsonData }));
        } else {
            const jsonData = { ...record };
            jsonData[dataIndex] = true
            dispatchAction = dispatch(crud.create({ entity, jsonData }));
            await dispatchAction;
        }
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
        let value, idx;
        if (dataIndex && dataIndex != undefined) {
            idx = dataIndex[0];
            value = record[idx]
        }
        const inputNode = <Switch
            defaultChecked={value}
            onChange={(e) => handleChange(e, record, idx)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />} />;
        return (
            <td {...restProps}>
                {editing ? (
                    inputNode
                ) : (
                    children
                )}
            </td>
        );
    };

    return (
        <>
            <Table
                components={{
                    body: { cell: EditableCell, },
                }}
                columns={mergedColumns}
                rowKey={(item) => item.userId._id}
                dataSource={dataSource}
                pagination={pagination}
                loading={listIsLoading}
                onChange={handelDataTableLoad}
                scroll={{ x: true }}
            />
        </>
    );
}
