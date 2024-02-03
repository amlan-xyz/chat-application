import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { verifyUserAsync } from "./features/auth/authSlice";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Chat } from "./pages/Chat/Chat";
import { RequiresAuth } from "./utils/auth";

function App() {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && status === "idle") {
      dispatch(verifyUserAsync()).then(() => navigate("/"));
    }
  }, [dispatch, status, navigate]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Chat />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
