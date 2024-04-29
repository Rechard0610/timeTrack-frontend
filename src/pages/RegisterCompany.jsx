import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crud } from '@/redux/crud/actions';

import useLanguage from '@/locale/useLanguage';

import { Form, Button } from 'antd';

import { register } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import RegisterForm from '@/modules/SettingModule/CompanySettingsModule/SettingsForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const RegisterCompany = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  // const size = useSize();

  const dispatch = useDispatch();
  const onFinish = (fieldsValue) => {
    console.log(fieldsValue);
    dispatch(crud.create({ entity: 'company', jsonData: fieldsValue }));
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <RegisterForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-teal-300"
              loading={isLoading}
              size="large"
            >
              {translate('Register')}
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    );
  };

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Register Company" />;
};

export default RegisterCompany;
