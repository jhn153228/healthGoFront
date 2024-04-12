import { useEffect, useState } from "react";

import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  List,
  Select,
  Space,
} from "antd";
import Axios from "axios";
import { API_URL } from "../constants/GlobalConstants";
import { useAppContext } from "../store";

function About() {
  const [RoutineData, setRoutineData] = useState([]); // 루틴 JSON(str) 데이터
  const [isLoading, setIsLoading] = useState(true);
  const {
    store: { jwtToken },
    // dispatch,
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${jwtToken}` };
      Axios.get(`${API_URL}/api/routine/`, {
        headers: headers,
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
    <Card title="루틴" bordered={false} style={{ width: "100%" }}>
      <List
        itemLayout="horizontal"
        dataSource={RoutineData}
        renderItem={(item, index) => (
          <Space direction="vertical" size={16}>
            <List.Item>
              <Card
                title={item.routine_name}
                extra={<a href="#">More</a>}
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
