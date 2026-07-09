import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const inputClasses = `
      h-12
      w-full
      rounded-2xl
      border
      border-gray-200
      bg-gray-50
      px-4
      text-[15px]
      text-gray-800
      placeholder:text-gray-400
      outline-none
      transition-all
      duration-200
      focus:border-[var(--color-accent)]
      focus:bg-white
      focus:ring-4
      focus:ring-[var(--color-accent)]/10
      `;

  return (
    <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-[var(--color-bg)]
          via-[#f9fbfb]
          to-[#eef7f5]
          px-4
        ">
      <div className="w-full max-w-md">
        <div
          className="
            w-full
            rounded-3xl
            border-2
            border-[var(--color-accent)]
            bg-white
            p-8
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          "
        >
          
          <h1
            className="mb-2 text-center text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)", color:"var(--color-accent)" }}
          >
            Welcome back
          </h1>
          <p className="mb-8 text-center text-sm text-gray-500">
            Log in to keep the conversation going.
          </p>

          <form onSubmit={onSubmitHandler}>
            {/* Username */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                type="text"
                placeholder="username"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[var(--color-accent)]
                  bg-white/[0.06]
                  px-4
                  text-[15px]
                  text-black
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-700
                  focus:border-[var(--color-accent)]
                  focus:bg-white/10
                  focus:ring-4
                  focus:ring-[var(--color-accent)]/20
                "
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[var(--color-accent)]
                    bg-white/[0.06]
                    px-4
                    pr-12
                    text-[15px]
                    text-black
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-gray-700
                    focus:border-[var(--color-accent)]
                    focus:bg-white/10
                    focus:ring-4
                    focus:ring-[var(--color-accent)]/20
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition-colors
                    duration-200
                    hover:text-[var(--color-accent)]
                  "
                >
                  {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                </button>
              </div>
            </div>

            {/* SignUp Link */}
            <Link
              to="/register"
              className="
                mb-6
                mt-4
                block
                text-center
                text-sm
                text-gray-500
                transition-all
                duration-200
                hover:text-[var(--color-accent)]
                hover:underline
                "
            >
              Don't have an account? Sign up
            </Link>

            {/* Button */}
            <button
              type="submit"
              className="
                h-12
                w-full
                rounded-2xl
                bg-[var(--color-accent)]
                text-white
                text-[15px]
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:brightness-110
                hover:shadow-xl
                active:scale-95
                "               
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