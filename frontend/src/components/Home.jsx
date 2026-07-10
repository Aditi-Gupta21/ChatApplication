import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[var(--color-bg)]
        via-[#f8fafc]
        to-[#eef7f5]
        p-0
        md:p-5
      "
    >
      <div
        className="
          mx-auto
          flex
          h-screen
          w-full
          overflow-hidden
          bg-[var(--color-surface)]
          md:h-[calc(100vh-40px)]
          md:max-w-[1650px]
          md:rounded-[30px]
          border-[3px]
          border-[var(--color-accent)]
          md:shadow-2xl
        "
      >
        {/* Sidebar */}
        <div
          className={`
            ${
              selectedUser ? "hidden md:flex" : "flex"
            }
            w-full
            shrink-0
            md:w-[360px]
            lg:w-[390px]
            border-r
            border-[var(--color-border)]
          `}
        >
          <Sidebar />
        </div>

        {/* Chat */}
        <div
          className={`
            ${
              selectedUser ? "flex" : "hidden md:flex"
            }
            flex-1
            w-full
            bg-[var(--color-surface)]
          `}
        >
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;