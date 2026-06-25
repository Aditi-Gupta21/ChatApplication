import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex h-[550px] w-200 max-w-6xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;