import { useEffect, useState } from 'react';

import { Card, List, Space } from 'antd';
import axiosInstance, { getAccessToken } from '../utils/AxiosInstance';

function About() {
  const [RoutineData, setRoutineData] = useState([]); // 루틴 JSON(str) 데이터
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      getAccessToken()?.length > 0 &&
        axiosInstance
          .get(`/api/routine/`, {
            // headers: headers,
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            const list_routine = res.data;
            setRoutineData(list_routine);
            setIsLoading(false);
          })

          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
    };
    fetchData();
    return () => {
      // Cleanup tasks, if any
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card title='루틴' bordered={false} style={{ width: '100%' }}>
      <List
        itemLayout='horizontal'
        dataSource={RoutineData}
        renderItem={(item, index) => (
          <Space direction='vertical' size={16}>
            <List.Item>
              <Card
                title={item.routine_name}
                extra={<a href='#'>More</a>}
                style={{ width: 300, marginRight: 10 }}
              ></Card>
            </List.Item>
          </Space>
        )}
      />
    </Card>
  );
}

export default About;
