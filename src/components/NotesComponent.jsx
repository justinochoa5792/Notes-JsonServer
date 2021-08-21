import { useEffect, useState } from "react";
import Axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await Axios.get("http://localhost:3001/notes");
    setNotes(response.data);
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
  }, []);

  return <div>{renderNotes()}</div>;
};

export default Notes;
