import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setAuthUser } from "../redux/userSlice";

const Login = () => {

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9000/api/v1/user/login', user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      
      dispatch(setAuthUser(res.data));
      navigate("/");
    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }

    setUser({
      userName: "",
      password: "",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md">
        <div
          className="
            p-8
            rounded-2xl
            bg-white/10
            backdrop-blur-lg
            border border-white/20
            shadow-2xl
          "
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Login
          </h1>

          <form onSubmit={onSubmitHandler}>
            {/* Username */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">Username</span>
              </label>
              <input
                value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })}
                type="text"
                placeholder="username"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* SignUp Link */}
            <Link
              to="/register"
              className="block text-center text-sm text-white hover:underline mb-4"
            >
              Don't have an account? SignUp
            </Link>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;