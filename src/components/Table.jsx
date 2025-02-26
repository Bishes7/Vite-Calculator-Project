import React, { useState } from "react";

const Table = ({
  taskList,
  switchTask,
  handleOnDelete,
  toDelete,
  entryList,
  badList,
  handleOnSelect,
}) => {
  // Function to select the checkbox

  //   const totalBadHr =
  return (
    <>
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
                          required
                        />
                        {item.task}
                      </div>
                    </td>
                    <td>{item.hours}</td>
                    <td className="text-end">
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

      {toDelete.length > 0 && (
        <div className="row my-5 ">
          <button
            className="btn btn-danger"
            onClick={() => handleOnDelete(toDelete)}
          >
            Delete {toDelete.length} tasks
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
