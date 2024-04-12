import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/GlobalConstants';

export default function Signup() {
  const naveigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: {
      validateStatus:
        | ''
        | 'error'
        | 'success'
        | 'warning'
        | 'validating'
        | undefined;
      help: string;
    };
  }>({});

  const onFinish = (values: {
    login_id: any;
    password: any;
    bench_1rm: any;
    deadlift_1rm: any;
    squat_1rm: any;
  }) => {
    async function fn() {
      console.log(values);
      const { login_id, password, username, email } = values;

      setFieldErrors({});

      const data = { login_id, password, username, email };
      console.log('data:', data);
      //   예외처리
      try {
        await Axios.post(`${API_URL}/accounts/signup/`, data);

        notification.open({
          message: '회원가입 성공',
          description: '로그인 페이지로 이동합니다.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });

        naveigate('/accounts/login');
      } catch (error: any) {
        if (error.response) {
          notification.open({
            message: '회원가입 실패',
            description: '아이디/암호를 확인해주세요.',
            icon: <FrownOutlined style={{ color: '#ff3333' }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc: any, [fieldName, errors]: [string, any]) => {
                // errors : ["m1", "m2"].join(" ") => "m1 "m2"
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
    <Form {...layout} onFinish={onFinish} autoComplete={'false'}>
      <Form.Item
        label='ID'
        name='login_id'
        rules={[
          { required: true, message: 'Please input your ID!' },
          { min: 5, message: '5글자 입력해주세요.' },
        ]}
        hasFeedback
        {...fieldErrors.login_id}
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

      <Form.Item
        label='Name'
        name='username'
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
      >
        <Input type="email"/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
