import { useState, useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';

import useLanguage from '@/locale/useLanguage';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

export default function SettingsForm() {
  const translate = useLanguage();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  // const [selectOptions, setOptions] = useState([]);

  // const navigate = useNavigate();
  // const handleSelectChange = (newValue) => {
  //   if (newValue === 'redirectURL') {
  //     navigate('/settings/currency');
  //   }
  // };
  // const asyncList = () => {
  //   return request.listAll({ entity: 'project', options: { enabled: true } });
  // };

  // const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  // useEffect(() => {
  //   isSuccess && setOptions(result);
  // }, [isSuccess]);

  // const optionsList = () => {
  //   const list = [];

  //   const value = 'redirectURL';
  //   const label = `+ Add New Currency`;

  //   list.push(...currencyOptions(selectOptions));
  //   list.push({ value, label });

  //   return list;
  // };

  return (
    <>
      <Form.Item
        label={translate('Add Project Prefix')}
        name="projectprefix"
        rules={[
          {
            required: true,
          },
        ]}

      >
        <Input className='w-6/12' />
      </Form.Item>
      <Form.Item
        label={translate('Reset Project Count')}
        name="resetprojectcnt"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber className='w-6/12'/>
      </Form.Item>
    </>
  );
}
