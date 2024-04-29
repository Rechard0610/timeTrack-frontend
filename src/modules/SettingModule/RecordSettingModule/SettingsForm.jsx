import { useState, useEffect } from 'react';
import { Form, Row, Col, InputNumber, Divider } from 'antd';

import useLanguage from '@/locale/useLanguage';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import FormGroup from 'rsuite/esm/FormGroup';

export default function SettingsForm() {
  const translate = useLanguage();

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
        label={translate('Set Ilde Time Limit')}
        name="idletimelimit"
        rules={[
          {
            required: true,
            message: 'Please enter idle time limit'
          },
        ]}
      >
        <InputNumber className='w-9/12' placeholder='Seconds' />
      </Form.Item>
      <Form.Item
        label={translate('Mouse Clicks')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="mouseclick"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Inactivity time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="clickindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label={translate('Keyboard Clicks')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="keyboardclick"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Inactivity time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="keyboardindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label={translate('MouseMovement')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="mousemove"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Inactivity time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="moveindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Divider />
      <Form.Item
        label={translate('Productive APP/URL time')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="productivetime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Track Time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="productiveindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label={translate('Neutral APP/URL time')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="neutraltime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Track Time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="neutralindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label={translate('Not Productive APP/URL time')}
        rules={[
          {
            required: true,
          },
        ]}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="unproductivetime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Track Time (Seconds)' />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item
              name="unproductiveindex"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber className='w-full' placeholder='Index' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Divider />
      <Form.Item
        label={translate('Set Screen Capture Interval')}
        name="screentime"
        rules={[
          {
            required: true,
            message: 'Please enter screen capture interval'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value >= 300) {
                return Promise.resolve();
              } else if (value != null) 
                return Promise.reject('Interval must be at least 300 seconds');
              return Promise.reject();
            },
          }),
        ]}
      >
        <InputNumber className='w-9/12' placeholder='Seconds (Minimum 300 seconds)' />
      </Form.Item>
    </>
  );
}
