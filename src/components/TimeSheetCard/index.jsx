import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import TimeSheetTable from './TimeSheetTable'

import useLanguage from '@/locale/useLanguage';

import { Button, Form, Avatar } from 'antd';
import Loading from '@/components/Loading';

export default function TimeSheetCard( { config } ) {
    const translate = useLanguage();
    const dispatch = useDispatch();
    // const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

    const [form] = Form.useForm();

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


    return (
        <div>
            <div className='mt-2'>
                <div className='text-[13px] text-slate-500 px-4 py-2 w-[150px] border-2 rounded-lg ml-5'>Mon, Mar 04, 2024</div>
                    <TimeSheetTable config={config} />
            </div>
        </div>
    );
}