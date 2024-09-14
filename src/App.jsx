import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./NotesPage";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <Router>
        <div id="app">
          <Routes>
            <Route path="/" element={<Register />} />
          </Routes>
          <Routes>
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
          <Routes>
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
