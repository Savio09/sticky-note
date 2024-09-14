import colors from "./colors.json";
import { useRef } from "react";
import { reset, createNote } from "../features/notes/noteSlice";
import { useDispatch } from "react-redux";

const CreateNote = ({ size = "24", color = "#FFFFFF" }) => {
  const startingPos = useRef(10);
  const dispatch = useDispatch();

  const addNote = async () => {
    const payload = {
      position: {
        x: startingPos.current,
        y: startingPos.current,
      },
      colors: colors[0],
      content: "",
    };
    dispatch(createNote(payload));
    startingPos.current += 10;
  };
  return (
    <div id="add-btn" title="New Card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke={color}
        fill="none"
        strokeWidth="2.5"
        onClick={addNote}
      >
        <path strokeLinecap="round" d="M18 12H6M12 6v12"></path>
      </svg>
    </div>
  );
};

export default CreateNote;
