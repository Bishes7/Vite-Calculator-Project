import React, { useState } from "react";

const Form = ({ addTaskList }) => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "hours" ? +value : value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTaskList(form);
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="border p-5 rounded-5 shadow-lg mt-5"
    >
      <div className="row g-2">
        <div className="col-md-6">
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            placeholder="Add Task "
            aria-label="First name"
            name="task"
            id="task"
          />
        </div>
        <div className="col-md-2">
          <input
            onChange={handleOnChange}
            type="number"
            className="form-control"
            placeholder="hours"
            aria-label="Last name"
            name="hours"
            min="1"
          />
        </div>
        <div className="col-md-4 d-grid">
          <button className="btn btn-success">Add New Task</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
