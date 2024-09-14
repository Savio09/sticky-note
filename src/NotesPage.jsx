import CreateNote from "./assets/Create";
import Controls from "./components/Controls";
import { reset, getNotes } from "./features/notes/noteSlice";
import NoteCard from "./components/NoteCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
const NotesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.note);
  const { user } = useSelector((state) => state.auth);

  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getNotes());
    }
  }, []);
  return (
    <NoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      <div>
        {notes && notes.map((note) => <NoteCard note={note} key={note._id} />)}
        <Controls />
      </div>
    </NoteContext.Provider>
  );
};

export default NotesPage;
