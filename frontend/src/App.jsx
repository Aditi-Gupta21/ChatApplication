import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";

import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUser , setIsTyping } from "./redux/userSlice.js";
import useSocketEvents from './Hooks/useSocketEvents.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const dispatch = useDispatch();

  const { authUser } = useSelector((store) => store.user);

  useSocketEvents();

  useEffect(() => {
    // If user is not logged in
    if (!authUser) {
      dispatch(setSocket(null));
      dispatch(setOnlineUser([]));
      dispatch(setIsTyping(false));
      return;
    }

    // Create socket connection
    const socket = io("http://localhost:9000", {
      query: {
        userId: authUser._id,
      },
    });

    // Save socket in Redux
    dispatch(setSocket(socket));

    // Listen for online users
    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUser(onlineUsers));
    });

    // Cleanup
    return () => {
      socket.off("getOnlineUsers");
      socket.close();
      dispatch(setSocket(null));
    };
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;