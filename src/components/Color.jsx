import { useContext } from "react";
import NoteContext from "../NoteContext";
import { reset, updateNote } from "../features/notes/noteSlice";
import { useDispatch } from "react-redux";
const Color = ({ color }) => {
  const { selectedNote } = useContext(NoteContext);
  const dispatch = useDispatch();
  const changeColor = () => {
    const data = {
      id: selectedNote._id,
      colors: color,
    };
    dispatch(updateNote(data));
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
      title={color.id.split("-")[1]}
    ></div>
  );
};

export default Color;
