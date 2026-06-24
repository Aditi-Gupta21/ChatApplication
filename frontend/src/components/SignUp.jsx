import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9000/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login")
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
      console.log(error);
    }

    setUser({

      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: ""
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
            Sign Up
          </h1>

          <form onSubmit={onSubmitHandler}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">Full Name</span>
              </label>
              <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">Username</span>
              </label>
              <input value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
              <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">
                  Confirm Password
                </span>
              </label>
              <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Gender */}
            <div className="flex gap-6 my-5 text-white">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={(e) =>
                    setUser({ ...user, gender: e.target.value })
                  }
                  className="radio radio-sm"
                />
                <span>Male</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={(e) =>
                    setUser({ ...user, gender: e.target.value })
                  }
                  className="radio radio-sm"
                />
                <span>Female</span>
              </label>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="block text-center text-sm text-white hover:underline mb-4"
            >
              Already have an account? Login
            </Link>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;