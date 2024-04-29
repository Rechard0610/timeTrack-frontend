import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function CreateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();
  const translate = useLanguage();
  const onSubmit = (fieldsValue) => {
    // Manually trim values before submission
    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    if (entity === 'people') {
      fieldsValue.invitedById = currentAdmin._id;
    } else {
      console.log(currentAdmin.role);
      if (currentAdmin.role !== 'owner') {
        fieldsValue.recipient = currentAdmin._id;
      }
      fieldsValue.userId = currentAdmin._id;
    }

    console.log(fieldsValue);
    // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //   return acc;
    // }, {});
    dispatch(crud.create({ entity, jsonData: fieldsValue, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      if (entity === 'client') {   /// when client page, I will remove it after last verison
        const options = { page: 1, items: 100 }
        dispatch(crud.list({ entity, options }));
      } else if (entity === 'payment') {
        const options = { filter: 'status', equal: 'pending' }
        dispatch(crud.list({ entity, options }));
      } else
        dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {formElements}
        <Form.Item>
          <Button type="primary" htmlType="submit" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
            {translate('Submit')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
