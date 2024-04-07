import React from "react";

function About() {
  const routineList = [
    { work_name: "컨벤셔널 데드리프트", set_infos: [], work_index: 1 },
    { work_name: "스쿼트", set_infos: [], work_index: 1 },
  ];
  const selectList = ["스쿼트", "벤치 프레스"];

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
        routineList.push({ work_name: select, set_infos: [], work_index: 1 });
      }
    }
    return routineList;
  }

  console.log(addUniqueWorkouts(routineList, selectList));

  return <div>About</div>;
}

export default About;
