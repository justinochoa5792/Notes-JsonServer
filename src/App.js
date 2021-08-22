import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const initialValues = {
    title: "",
    description: "",
  };
  const [values, setValues] = useState(initialValues);
  const [addItem, setAddItem] = useState([]);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await Axios.get("http://localhost:3001/notes");
    setNotes(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("http://localhost:3001/notes", {
      title: values.title,
      description: values.description,
    });
    setAddItem(res.data);
  };

  const renderNotes = () => {
    return notes.map((note, index) => {
      return (
        <div className="container" key={index}>
          <div className="card m-3">
            <h5 className="card-header">{note.title}</h5>
            <div className="card-body">
              <h5 className="card-title">{note.description}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    getNotes();
  }, [addItem]);

  return (
    <div className="App">
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Add Title
            </span>
          </div>
        </div>
        <input
          onChange={handleChange}
          name="title"
          value={values.title}
          type="text"
          className="form-control mb-3"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Add Description
            </span>
          </div>
        </div>

        <input
          onChange={handleChange}
          name="description"
          value={values.description}
          type="text"
          className="form-control mb-2"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <button className="btn btn-outline-primary">Add</button>
      </form>
      {renderNotes()}
    </div>
  );
}

export default App;
