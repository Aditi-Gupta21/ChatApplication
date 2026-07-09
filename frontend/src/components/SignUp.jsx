import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const inputClasses = `
h-12
w-full
rounded-2xl
border
border-[var(--color-accent)]
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
"
>
      <div className="w-full max-w-md">
        <div
          className="
            rounded-3xl
            border-2
            border-[var(--color-accent)]
            bg-white
            p-8
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        "
        >
          <h1
            className="mb-1 text-center text-3xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-display)" , color:"var(--color-accent)"}}
          >
            Create your account
          </h1>
          <p className="mb-8 text-center text-sm text-gray-500">
            Join and start chatting in real time.
          </p>

          <form onSubmit={onSubmitHandler}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                type="text"
                placeholder="John Doe"
                className={inputClasses}
              />
            </div>

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
                className={inputClasses}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`${inputClasses} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  value={user.confirmPassword}
                  onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`${inputClasses} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {showConfirmPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                </button>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-1.5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex gap-3">
                {["male", "female"].map((option) => {
                  const isChecked = user.gender === option;
                  return (
                    <label
                      key={option}
                      className={`
                        flex
                        flex-1
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border
                        px-4
                        py-3
                        text-sm
                        font-medium
                        capitalize
                        transition-all
                        duration-200
                        ${isChecked
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                          : "border-[var(--color-accent)] bg-gray-50 text-gray-600 hover:border-[var--color-accent)] hover:bg-[var(--color-accent)]/5 "
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={isChecked}
                        onChange={(e) =>
                          setUser({ ...user, gender: e.target.value })
                        }
                        className="sr-only"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="mb-5 mt-4 block text-center text-sm text-gray-500 transition-all duration-200 hover:text-[var(--color-accent)] hover:underline"
            >
              Already have an account? Login
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
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
                hover:brightness-120
                active:scale-95
                "
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