import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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

          <form>
            {/* Full Name */}
            <div className="mb-4">
              <label className="label p-1">
                <span className="label-text text-white">Full Name</span>
              </label>
              <input
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
              <input
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
              <input
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
                  className="radio radio-sm"
                />
                <span>Male</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
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