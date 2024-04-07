import React, { useEffect, useState } from "react";

import Axios from "axios";
import { useAppContext } from "../store";
import {
  Card,
  DatePicker,
  Space,
  Select,
  Form,
  Button,
  List,
  Input,
} from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function Routine() {
  const buttonStyle = {
    fontSize: "20px",
    color: "Gray",
  };

  const {
    store: { jwtToken },
    // dispatch,
  } = useAppContext();

  const [workDate, setWorkDate] = useState(""); // 날짜 상태
  const [RoutineData, setRoutineData] = useState([]); // 루틴 JSON(str) 데이터
  const [submitState, setSubmitState] = useState("");

  const removeItem = (key) => {
    const updatedRoutineData = [...RoutineData];
    updatedRoutineData.splice(key, 1); // 해당 key에 해당하는 아이템 제거
    setRoutineData(updatedRoutineData); // 변경된 리스트로 업데이트
  };

  // 날짜 선택했을 때 루틴기록 가져오기
  const dateOnChange = (e) => {
    const date_form = e.$y + "-" + (e.$M + 1) + "-" + e.$D;

    setWorkDate(date_form);
    const headers = { Authorization: `JWT ${jwtToken}` };
    Axios.get("http://localhost:8000/api/routines/", {
      params: { work_date: date_form },
      headers: headers,
    })
      .then((res) => {
        const worksJson = JSON.parse(res.data[0].works_json);
        const list_routine = worksJson.routine;
        setRoutineData(list_routine);
        setSubmitState("put"); // 기존 데이터 존재하므로 PUT
      })
      .catch((err) => {
        setSubmitState("post"); // 기존 데이터 없으므로 POST
        setRoutineData([]); // 이전 데이터 초기화
      });
  };
  // 운동종목 불러오기
  const options = [];
  const [workOuts, setWorkOuts] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8000/workouts/")
      .then((res) => {
        setWorkOuts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  workOuts.forEach((workout) => {
    options.push({ value: workout.work_name, label: workout.work_name });
  });

  // 운동종목 추가하기
  const selectOnFinish = async (e) => {
    const select_data_list = e.Select;
    function addUniqueWorkouts(routineList, selectList) {
      for (const select of selectList) {
        let isDuplicate = false;
        for (const routine of routineList) {
          if (routine.work_name === select) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          setRoutineData((prevArray) => [
            ...prevArray,
            {
              work_name: select,
              set_infos: [{ set: 0, kg: 0, labs: 0 }],
            },
          ]);
        }
      }
    }
    addUniqueWorkouts(RoutineData, select_data_list);
  };
  // 서브밋
  const onFinish = (formData) => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    if (submitState === "put") {
      Axios.put(
        "http://localhost:8000/api/routines/1/",
        {
          work_date: workDate,
          form_data: formData,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (submitState === "post") {
      Axios.post(
        "http://localhost:8000/api/routines/",
        {
          work_date: workDate,
          form_data: formData,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Space direction="vertical">
        <DatePicker onChange={dateOnChange} />
      </Space>
      <Form onFinish={selectOnFinish}>
        <div style={{ display: "flex" }}>
          <Form.Item
            label="Select"
            name="Select"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ width: "70%" }}
          >
            <Select mode="tags" placeholder="Tags Mode" options={options} />
          </Form.Item>
          <Form.Item style={{ marginLeft: "5px", width: "30%" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "white" }}
            >
              <PlusCircleOutlined style={buttonStyle} />
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Card title="루틴" bordered={false} style={{ width: "100%" }}>
        <Form
          name="rootine_form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <List
            itemLayout="vertical"
            dataSource={RoutineData}
            renderItem={(item, index) => (
              <List.Item>
                <div style={{ display: "flex", width: "100%" }}>
                  <h3 display="flex">{item.work_name}</h3>
                  <MinusCircleOutlined
                    fontSize="18"
                    style={buttonStyle}
                    onClick={() => removeItem(index)}
                  />
                </div>

                <Form.List
                  name={[item.work_name]}
                  initialValue={item.set_infos}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={name}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                            width: "100%",
                          }}
                        >
                          <p>{name + 1}</p>
                          <Form.Item
                            name={[name, "set"]}
                            noStyle // 시각적으로 숨기지 않음
                            initialValue={name + 1} // 기본값으로 key + 1 설정
                            hidden // Form 데이터에 포함되지만 시각적으로는 보이지 않음
                          >
                            <Input type="hidden" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "kg"]}
                            style={{ marginLeft: 10, width: "40%" }}
                            defaultValue={() => {
                              //FIXME: antd Form 컴포넌트에서 initialValue를 사용하려면 Form.List의 직계 자식만 받을수 있어서 list의 갯수는 가져오지만 value가 설정이 안되는 이슈가 있음 (에러 무시)
                              if (item.set_infos[key]) {
                                return item.set_infos[key].kg;
                              } else {
                                return;
                              }
                            }}
                          >
                            <Input
                              placeholder="KG"
                              rules={[
                                {
                                  // required: true,
                                  message: "숫자를입력해주세요",
                                  pattern: "[0-9]+",
                                },
                              ]}
                            />
                          </Form.Item>

                          <Form.Item
                            name={[name, "labs"]}
                            style={{ marginLeft: 10, width: "40%" }}
                            defaultValue={() => {
                              if (item.set_infos[name]) {
                                return item.set_infos[name].labs;
                              } else {
                                return;
                              }
                            }}
                          >
                            <Input
                              placeholder="Labs"
                              rules={[
                                {
                                  // required: true,
                                  pattern: "[0-9]+",
                                },
                              ]}
                            />
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            fontSize="12"
                            style={buttonStyle}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </List.Item>
            )}
          />
          {RoutineData.length > 0 ? (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </Form.Item>
          ) : null}
        </Form>
      </Card>
    </>
  );
}

export default Routine;
