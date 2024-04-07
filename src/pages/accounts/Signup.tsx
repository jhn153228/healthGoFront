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
    username: any;
    password: any;
    bench_1rm: any;
    deadlift_1rm: any;
    squat_1rm: any;
  }) => {
    async function fn() {
      console.log(values);
      const { username, password, bench_1rm, deadlift_1rm, squat_1rm } = values;

      setFieldErrors({});

      const data = { username, password, bench_1rm, deadlift_1rm, squat_1rm };
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
        label='Username'
        name='username'
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 5, message: '5글자 입력해주세요.' },
        ]}
        hasFeedback
        {...fieldErrors.username}
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
        label='Bench_1rm'
        name='bench_1rm'
        rules={[
          { message: 'Bench_1rm' },
          {
            message: '숫자를입력해주세요',
            pattern: new RegExp('[0-9]+'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Squat_1rm'
        name='squat_1rm'
        rules={[
          { message: 'squat_1rm' },
          {
            message: '숫자를입력해주세요',
            pattern: new RegExp('[0-9]+'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Deadlift_1rm'
        name='deadlift_1rm'
        rules={[
          { message: 'deadlift_1rm' },
          {
            message: '숫자를입력해주세요',
            pattern: new RegExp('[0-9]+'),
          },
        ]}
      >
        <Input />
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
