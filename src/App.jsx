import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";

const hrsPerWeek = 24 * 7;

function App() {
  const [taskList, setTaskList] = useState([]);

  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGnerator(),
      type: "entry",
    };

    setTaskList([...taskList, obj]);
  };
  const switchTask = (id, type) => {
    const tempArr = taskList.map((item) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setTaskList(tempArr);
  };

  const randomIdGnerator = (length = 6) => {
    const str =
      "qwertyuioplkjhgfdsazxxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

    let id = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);

      id += str[randomIndex];
    }
    return id;
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Do you want to delete this ?")) {
      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  const ttlHr = taskList.reduce((acc, item) => acc + item.hours, 0);

  return (
    <div className="wrapper pt-5">
      <div className="container">
        <h1 className="text-center yuji-mai-regular">Time Divider App</h1>

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- Tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />
        <div className="alert alert-success text-center">
          The total hours allocated is <span id="ttl">{ttlHr}</span> hours
        </div>
      </div>
    </div>
  );
}

export default App;
