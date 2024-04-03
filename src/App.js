import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
