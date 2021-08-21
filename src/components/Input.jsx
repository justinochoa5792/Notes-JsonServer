import React, { useState } from "react";
import Axios from "axios";

const Input = () => {
  const [addTitle, setAddTitle] = useState("");
  const [addItem, setAddItem] = useState([]);

  const handleChange = (e) => {
    setAddTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("http://localhost:3001/notes", {
      title: addTitle,
      description: "testing",
    });
    setAddItem(res.data);
    window.location.reload();
  };
  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Add Title
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </form>
      </div>
      {addItem.title}
    </>
  );
};

export default Input;
