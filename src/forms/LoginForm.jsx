import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

export default function LoginForm(props) {
  const translate = useLanguage();
  return (
    <>
    {
      props.type === "register" &&
      <Form.Item
        label={translate('first name')}
        name="firstname"
        rules={[
          {
            required: true,
          },
          {
            type: 'text',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translate('firstname')}
          type="text"
          size="large"
        />
      </Form.Item>
    }
    {
      props.type === "register" &&
      <Form.Item
        label={translate('last name')}
        name="lastname"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translate('lastname')}
          type="text"
          size="large"
        />
      </Form.Item>
    }
      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translate('email')}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate('password')}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={translate('password')}
          size="large"
        />
      </Form.Item>
      {
        props.type === "login" &&
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{translate('Remember me')}</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/forgetpassword">
            {translate('Forgot password')}
          </a>
        </Form.Item>
      }
    </>
  );
}
