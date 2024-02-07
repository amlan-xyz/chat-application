import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Navbar } from "./components/Navbar/Navbar";
import { verifyUserAsync } from "./features/auth/authSlice";
import { getOnlineUser } from "./features/chat/chatSlice";
import { setSocket } from "./features/socket/socketSlice";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Chat } from "./pages/Chat/Chat";
import { RequiresAuth } from "./utils/auth";

function App() {
  const { status, user, loggedIn } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    dispatch(setSocket(newSocket));

    return () => {
      newSocket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && status === "idle") {
      dispatch(verifyUserAsync()).then(() => navigate("/"));
    }
  }, [dispatch, status, navigate]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getusers", (res) => {
      dispatch(getOnlineUser(res));
    });
    return () => {
      socket.off("getusers");
    };
  }, [socket, user, loggedIn, dispatch]);

  return (
    <div className="body">
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
    </div>
  );
}

export default App;
