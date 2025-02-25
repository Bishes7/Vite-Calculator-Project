import React, { useState } from "react";

const Table = ({ taskList, switchTask, handleOnDelete }) => {
  const [toDelete, setToDelete] = useState([]);

  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  // Function to select the checkbox

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

  console.log(toDelete);

  //   const totalBadHr =
  return (
    <div className="row mt-5">
      <div className="col-md text-center">
        <h3>Entry List</h3>
        <hr />
        <input
          onChange={handleOnSelect}
          className="form-check-input"
          type="checkbox"
          value="allEntry"
          id="entry-list"
        />
        <label htmlFor="entry-list">Select All</label>

        <table className="table table-striped table-hover border shadow-lg">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <input
                        onChange={handleOnSelect}
                        className="form-check-input me-2"
                        type="checkbox"
                        value={item?._id}
                        checked={toDelete.includes(item._id)}
                      />
                      {item.task}
                    </div>
                  </td>
                  <td>{item.hours}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnDelete(item._id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item._id, "bad")}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col text-center">
        <h3>Bad List</h3>
        <hr />
        <input
          onChange={handleOnSelect}
          className="form-check-input"
          type="checkbox"
          value="allBad"
          id="bad-list"
        />
        <label htmlFor="bad-list">Select All</label>
        <table className="table table-striped table-hover border shadow-lg">
          <tbody id="badlist">
            {badList.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <input
                        onChange={handleOnSelect}
                        className="form-check-input me-2"
                        type="checkbox"
                        value={item?._id}
                        checked={toDelete.includes(item._id)}
                      />
                      {item.task}
                    </div>
                  </td>
                  <td>{item.hours}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnDelete(item._id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="alert alert-success">
          You could have saved {badList.reduce((acc, i) => acc + i.hours, 0)}
          <span id="savedhours"></span>
          hours
        </div>
      </div>
    </div>
  );
};

export default Table;
