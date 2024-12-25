import React from "react";

const Table = ({ taskList, switchTask, handleOnDelete }) => {
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  //   const totalBadHr =
  return (
    <div className="row mt-5">
      <div className="col-md text-center">
        <h3>Entry List</h3>
        <hr />
        <table className="table table-striped table-hover border shadow-lg">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hours}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnDelete(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item.id, "bad")}
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
        <table className="table table-striped table-hover border shadow-lg">
          <tbody id="badlist">
            {badList.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hours}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnDelete(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item.id, "entry")}
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
