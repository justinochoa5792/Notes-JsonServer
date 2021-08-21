import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [addTitle, setAddTitle] = useState("");
  const [addItem, setAddItem] = useState([]);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await Axios.get("http://localhost:3001/notes");
    setNotes(response.data);
  };

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
  };

  const renderNotes = () => {
    return notes.map((note, index) => {
      return (
        <div key={index}>
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
      {renderNotes()}
      {/* <Input /> */}
      {/* <Notes /> */}
    </div>
  );
}

export default App;
