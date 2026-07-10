import { useState } from "react";
import { FiArrowLeft, FiRefreshCw, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthUser } from "../redux/userSlice";

const Profile = () => {
  const { authUser } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(authUser?.fullName);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }

    setIsSaving(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        { fullName },
        { withCredentials: true }
      );

      dispatch(updateAuthUser(res.data.user));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAvatar = async () => {
    setIsGenerating(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        { generateAvatar: true },
        { withCredentials: true }
      );

      dispatch(updateAuthUser(res.data.user));
      toast.success("New avatar generated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate avatar"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] p-4">
      <div className="w-full max-w-md rounded-3xl bg-[var(--color-surface)] shadow-xl">

        {/* Header */}
        <div className="relative h-20 rounded-t-3xl overflow-visible bg-[linear-gradient(135deg,var(--color-ink),var(--color-accent))]">
          <button
            onClick={() => navigate("/")}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
          >
            <FiArrowLeft size={20} />
          </button>

          {/* Avatar */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
            <img
              src={authUser?.profilePhoto}
              alt="Profile"
              className="h-28 w-28 rounded-full border-[6px] border-white bg-[var(--color-accent)] object-cover shadow-xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-15 pb-8">

          <div className="flex flex-col items-center">

            <h1
              className="text-3xl font-bold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {authUser?.fullName}
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              @{authUser?.userName}
            </p>

            <button
              onClick={handleGenerateAvatar}
              disabled={isGenerating}
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--color-accent-soft)]
                px-5
                py-2.5
                text-sm
                font-medium
                text-[var(--color-accent)]
                transition
                hover:brightness-95
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <FiRefreshCw
                size={16}
                className={isGenerating ? "animate-spin" : ""}
              />
              {isGenerating ? "Generating..." : "Generate New Avatar"}
            </button>

          </div>

          <div className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Full Name
              </label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  px-4
                  py-3
                  text-[var(--color-ink)]
                  outline-none
                  transition
                  focus:border-[var(--color-accent)]
                  focus:ring-4
                  focus:ring-[var(--color-accent-soft)]
                "
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-600">
                Username
                <FiLock size={12} className="text-slate-400" />
              </label>

              <input
                value={authUser?.userName}
                disabled
                className="
                  w-full
                  rounded-xl
                  bg-[var(--color-surface-muted)]
                  px-4
                  py-3
                  text-slate-500
                "
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-600">
                Gender
                <FiLock size={12} className="text-slate-400" />
              </label>

              <input
                value={authUser?.gender}
                disabled
                className="
                  w-full
                  rounded-xl
                  bg-[var(--color-surface-muted)]
                  px-4
                  py-3
                  capitalize
                  text-slate-500
                "
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="
                mt-5
                w-full
                rounded-xl
                bg-[var(--color-accent)]
                py-3
                font-semibold
                text-white
                shadow-sm
                transition
                hover:brightness-110
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;