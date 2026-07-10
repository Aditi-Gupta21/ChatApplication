import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiLogOut, FiUser } from "react-icons/fi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(null));
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="flex h-full w-full flex-col bg-[#f8fafc]">

      {/* ================= PROFILE ================= */}
      <div className="bg-white px-6 py-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src={authUser?.profilePhoto}
              alt={authUser?.fullName}
              className="
                h-16
                w-16
                rounded-full
                border-2
                border-[var(--color-accent)]
                object-cover
                shadow-md
              "
            />

            <div className="min-w-0">

              <h2
                className="truncate text-xl font-bold text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {authUser?.fullName}
              </h2>

              <p className="mt-1 truncate text-sm text-slate-500">
                @{authUser?.userName}
              </p>

            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() => navigate("/profile")}
              title="Profile"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-600
                transition-all
                duration-200
                hover:bg-[var(--color-accent-soft)]
                hover:text-[var(--color-accent)]
              "
            >
              <FiUser size={19} />
            </button>

            <button
              onClick={logoutHandler}
              title="Logout"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-600
                transition-all
                duration-200
                hover:bg-red-50
                hover:text-red-500
              "
            >
              <FiLogOut size={19} />
            </button>

          </div>

        </div>

      </div>

      {/* ---------- Divider ---------- */}
      <div className="border-b border-slate-200" />

      {/* ================= SEARCH ================= */}

      <div className="bg-white px-6 py-5">

        <div className="relative">

          <BiSearchAlt2
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-12
              w-full
              rounded-full
              border
              border-slate-200
              bg-slate-50
              pl-12
              pr-4
              text-sm
              text-[var(--color-ink)]
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-[var(--color-accent)]
              focus:bg-white
              focus:ring-4
              focus:ring-[var(--color-accent-soft)]
            "
          />

        </div>

      </div>

      {/* ---------- Divider ---------- */}
      <div className="border-b border-slate-200" />

      {/* ================= CONVERSATIONS ================= */}

      <div className="flex items-center justify-between bg-[#f8fafc] px-6 py-3">

        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Conversations
        </h3>

        <span
          className="
            rounded-full
            bg-[var(--color-accent-soft)]
            px-3
            py-1
            text-[11px]
            font-semibold
            text-[var(--color-accent)]
          "
        >
          Chats
        </span>

      </div>

      {/* ---------- Divider ---------- */}
      <div className="border-b border-slate-200" />

      {/* ================= USERS ================= */}

      <div className="flex-1 overflow-hidden bg-[#f8fafc]">

        <OtherUsers search={search} />

      </div>

    </aside>
  );
};

export default Sidebar;