import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';

import { Button, Form, Modal } from 'antd';
import Loading from '@/components/Loading';
import UpdateAdmin from '@/modules/ProfileModule/components/UpdateAdmin';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [updatedData, setUpdatedData] = useState({'id': '', 'status': ''});

  const showCurrentRecord = () => {
    readBox.open();
  };

  const updateChildren = (updatedValues) => {
    
    if (entity === 'project' && updatedValues.status != current.status) {
      console.log(current);
      updatedData.id = current._id
      updatedData.status = updatedValues.status;
      setModalOpen(true);
    }
  }


  const onSubmit = (fieldsValue) => {
    const id = current._id;

    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    updateChildren(fieldsValue);

    dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
  };
  useEffect(() => {
    if (current) {
      let newValues = { ...current };
      if (entity === 'task' && newValues.budget !== undefined) {
        if (newValues.project.isfixed) {
          newValues.budget = Number(newValues.budget.replace(/\$/g, ''));
          newValues.prefix = 'fixed';
          newValues.suffix = 'fixed'
        } else {
          newValues.budget = Number(newValues.budget.replace(/\H/g, ''));
          newValues.prefix = 'hours';
          newValues.suffix = 'hours'
        }
        newValues.budget = { id: newValues.project._id, currentbudget: newValues.budget };
      } else if (entity === 'project') {
        if (newValues.isfixed) {
          newValues.budget = Number(newValues.budget.replace(/\$/g, ''));
          newValues.prefix = 'fixed';
          newValues.suffix = 'fixed'
        } else {
          newValues.budget = Number(newValues.budget.replace(/\H/g, ''));
          newValues.prefix = 'hours';
          newValues.suffix = 'hours'
        }
      }

      if (newValues.birthday) {
        newValues = {
          ...newValues,
          birthday: dayjs(newValues['birthday']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.date) {
        newValues = {
          ...newValues,
          date: dayjs(newValues['date']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.expiredDate) {
        newValues = {
          ...newValues,
          expiredDate: dayjs(newValues['expiredDate']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.created) {
        newValues = {
          ...newValues,
          created: dayjs(newValues['created']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.updated) {
        newValues = {
          ...newValues,
          updated: dayjs(newValues['updated']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      form.resetFields();
      form.setFieldsValue(newValues);
    }
  }, [current]);

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'update' }));
      console.log(entity);
      if (entity === 'client') {   /// when client page, I will remove it after last verison
        const options = { page: 1, items: 100 }
        dispatch(crud.list({ entity, options }));
      } else if(entity === 'payment') {
        const options = { filter: 'status', equal: 'pending' }
        dispatch(crud.list({ entity, options }));
      } else
        dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const { isEditBoxOpen } = state;

  const handleUpdateTask = () => {
    request.updateChild({ entity: 'task', updatedData });
    setModalOpen(false);
  }

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Modal
          title="Update Task Status"
          open={modalOpen}
          onOk={handleUpdateTask}
          onCancel={() => setModalOpen(false)}
          okButtonProps={{
            className: 'bg-teal-300'
          }}

        >
          <p>Do you want to update status of task?</p>
        </Modal>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item
            style={{
              display: 'inline-block',
              paddingRight: '5px',
            }}
          >
            <Button type="primary" htmlType="submit" className='bg-teal-300'>
              {translate('Save')}
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              paddingLeft: '5px',
            }}
          >
            <Button onClick={showCurrentRecord}>{translate('Cancel')}</Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}
