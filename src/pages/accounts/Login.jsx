import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../utils/AxiosInstance';

export default function Login() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { login_id, password } = values;

      setFieldErrors({});

      const data = { login_id, password };
      try {
        const response = await axiosInstance.post(`/accounts/token/`, data);
        const {
          data: { access: jwtToken },
        } = response;

        setAccessToken(jwtToken);

        notification.open({
          message: '로그인 성공',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });

        navigate('/routine'); // TODO: 이동 주소
        window.location.reload();
      } catch (error) {
        if (error.response) {
          notification.open({
            message: '로그인 실패',
            description: '아이디/암호를 확인해주세요.',
            icon: <FrownOutlined style={{ color: '#ff3333' }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: 'error',
                  help: errors.join(' '),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <Card title='로그인'>
      <Form
        {...layout}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete={'false'}
      >
        <Form.Item
          label='ID'
          name='login_id'
          rules={[
            { required: true, message: 'Please input your ID!' },
            { min: 5, message: '5글자 입력해주세요.' },
          ]}
          hasFeedback
          {...fieldErrors.login_id}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
