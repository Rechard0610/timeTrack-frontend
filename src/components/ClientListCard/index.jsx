import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';

import { useCrudContext } from '@/context/crud';
import ClientHeader from './ClientHeader'
import ClientInfoCard from './ClientInfoCard';

import useLanguage from '@/locale/useLanguage';

import { Form } from 'antd';
import Loading from '@/components/Loading';

export default function ClientListCard({ config }) {
    let { entity, searchConfig } = config;
    const translate = useLanguage();
    const dispatch = useDispatch();
    const { crudContextAction } = useCrudContext();
    const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;

    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

    const { pagination, items: dataSource } = listResult;

    const [alignValue, setAlignValue] = useState('active');

    const removeItem = (record) => {
        dispatch(crud.currentItem({ data: record }));
        dispatch(crud.currentAction({ actionType: 'delete', data: record }));
        modal.open();
    };

    const editItem = (record) => {
        console.log(record);
        dispatch(crud.currentItem({ data: record }));
        dispatch(crud.currentAction({ actionType: 'update', data: record }));
        editBox.open();
        panel.open();
        collapsedBox.open();
    };

    const filterTable = (value) => {
        const options = { q: value, fields: searchConfig?.searchFields || '' };
        dispatch(crud.list({ entity, options }));
    };

    // const onSubmit = (fieldsValue) => {
    //     const id = current._id;

    //     if (fieldsValue.file && withUpload) {
    //         fieldsValue.file = fieldsValue.file[0].originFileObj;
    //     }
    //     // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //     //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //     //   return acc;
    //     // }, {});
    //     dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
    // };

    // useEffect(() => {
    //     if (isSuccess) {
    //         readBox.open();
    //         collapsedBox.open();
    //         panel.open();
    //         form.resetFields();
    //         dispatch(crud.resetAction({ actionType: 'update' }));
    //         dispatch(crud.list({ entity }));
    //     }
    // }, [isSuccess]);

    const dispatcher = () => {
        const options = { page: 1, items: 100 }
        dispatch(crud.list({ entity, options }));
    };

    useEffect(() => {
        dispatcher();
    }, []);


    return (
        <div>
            <ClientHeader config={config} setAlignValue={setAlignValue} filterTable={filterTable} />
            <div className='grid'>
                {alignValue === "active" &&
                    <div className=''>
                        <p>All Clients</p>
                        <div className='grid gap-3 mt-3' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                            {
                                dataSource.map((item, index) =>
                                    <ClientInfoCard data={item} key={index} editItem={() => editItem(item)} removeItem={() => removeItem(item)} />
                                )
                            }
                        </div>
                    </div>}
                {alignValue === "archived" &&
                    <div className=''>
                        <p>Archived Clients</p>
                        <div className='grid gap-3 mt-3' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                            {/* <ClientInfoCard data={dataSource} key={4} />
                            <ClientInfoCard data={dataSource} key={5} /> */}
                        </div>
                    </div>}
            </div>
        </div>
    );
}