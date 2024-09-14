import { useContext, useRef } from "react";
import Trash from "../icons/Trash";
import { useEffect } from "react";
import { useState } from "react";
import { setNewOffset, autoGrow, zIndexSet } from "../utils/utils";
import { reset, updateNote } from "../features/notes/noteSlice";
import { useDispatch } from "react-redux";
import Spinner from "../icons/Spinner";
import NoteContext from "../NoteContext";

const NoteCard = ({ note }) => {
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const [body, setBody] = useState(note.content);
  const colors = note?.colors;
  // Working with dragging the positions of the items
  const [position, setPosition] = useState(note.position);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const { setSelectedNote } = useContext(NoteContext);

  const dispatch = useDispatch();

  let mouseStartPos = { x: 0, y: 0 };

  const mouseDown = (e) => {
    zIndexSet(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    if (e.target.className === "card-header") {
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };
    // Reset the new position of the card for the next move to begin
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    zIndexSet(cardRef.current);
  });

  const saveData = (data) => {
    dispatch(updateNote(data));
    setSaving(false);
  };
  const mouseUp = async () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    const formData = {
      id: note._id,
      position: setNewOffset(cardRef.current),
    };
    saveData(formData);
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      const formData = {
        id: note._id,
        content: body,
      };
      saveData(formData);
    }, 2000);
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors ? colors.colorBody : "inherit",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
      onMouseDown={(e) => mouseDown(e)}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: colors ? colors.colorHeader : "transparent",
        }}
      >
        {saving && (
          <div className="card-saving">
            <Spinner color={"black"} />
            <span style={{ color: colors.colorText }}>Saving</span>
          </div>
        )}
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          style={{
            color: colors.colorText,
          }}
          ref={textAreaRef}
          defaultValue={body}
          onInput={(e) => {
            autoGrow(textAreaRef);
            setBody(e.target.value);
            setSelectedNote(note);
          }}
          onFocus={() => {
            zIndexSet(cardRef.current);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
