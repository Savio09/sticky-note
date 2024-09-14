import { useDispatch } from "react-redux";
import CreateNote from "../assets/Create";
import colors from "../assets/colors.json";
import Color from "./Color";
import { logout, reset } from "../features/auth/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Controls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div id="controls">
      <CreateNote />
      {colors.map((color) => (
        <Color color={color} key={color.id} />
      ))}
      <button
        onClick={handleLogOut}
        id="add-btn"
        title="logout"
        style={{ outline: "none", border: 0 }}
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Controls;
