import { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import {
  deleteTask,
  getTask,
  patchTask,
  postTask,
} from "./helperAxios/axiosHelper";

const hrsPerWeek = 24 * 7;

function App() {
  const [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState({});

  const [toDelete, setToDelete] = useState([]);

  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  // Using useREf to render the elements once
  const fetchRef = useRef(true);

  const ttlHr = taskList.reduce((acc, item) => acc + item.hours, 0);

  // UseEffect to fetch first data
  useEffect(() => {
    fetchRef.current && fetchTask();
    fetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    if (ttlHr + taskObj.hours > hrsPerWeek) {
      return alert("You cannot add more");
    }

    const response = await postTask(taskObj);
    setResp(response);
    if (response.status === "success") {
      fetchTask();
    }
  };

  const fetchTask = async () => {
    const data = await getTask();
    console.log(data);
    data?.status === "success" && setTaskList(data.savedData);
  };
  const switchTask = async (_id, type) => {
    const data = await patchTask({ _id, type });

    data.status === "success" && setResp(data);
    if (data.status === "success") {
      fetchTask();
    }
  };

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("Do you want to delete this ?")) {
      // delete method

      const response = await deleteTask(idsToDelete);
      setResp(response);
      if (response.status === "success") {
        fetchTask();
        setToDelete("");
      }
    }
  };

  // Handle On Select
  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    // create a temporary  array
    let temArray = [];
    if (value === "allEntry") {
      temArray = entryList;
    }

    if (value === "allBad") {
      temArray = badList;
    }

    //  Implementng conditions
    if (checked) {
      if (value === "allEntry" || value === "allBad") {
        // get all ids from entrylist or badlist

        const ids = temArray.map((item) => item._id);

        // Condition to remove a dublicate id

        const uniqueIds = [...new Set([...toDelete, ...ids])];

        setToDelete(uniqueIds);
        return;
      }

      setToDelete([...toDelete, value]);
    } else {
      // Not checked
      if (value === "allEntry" || value === "allBad") {
        const ids = temArray.map((item) => item._id);

        const deletedEntry = toDelete.filter((_id) => !ids.includes(_id));
        setToDelete(deletedEntry);
        return;
      }
      setToDelete(toDelete.filter((_id) => _id !== value));
    }
    // console.log(checked, value);
  };

  return (
    <div className="wrapper pt-5">
      <div className="container">
        <h1 className="text-center yuji-mai-regular">Time Divider App</h1>

        {resp?.message && (
          <div
            className={
              resp?.message === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- Tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
          toDelete={toDelete}
          entryList={entryList}
          badList={badList}
          handleOnSelect={handleOnSelect}
        />
        <div className="alert alert-success text-center">
          The total hours allocated is <span id="ttl">{ttlHr}</span> hours
        </div>
      </div>
    </div>
  );
}

export default App;
