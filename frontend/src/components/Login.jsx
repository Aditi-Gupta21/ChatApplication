import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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

          <form>
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