import React from "react";

function Home() {
  return (
    <div className="w-full px-10">

      <h1 className="font-semibold text-5xl mt-5 text-center">
        Welcome back!
      </h1>

      <div className="flex justify-between py-10">

        <div className="space-y-3 bg-amber-50 p-7 rounded-3xl drop-shadow-md w-[30%]">
          <h1 className="font-medium text-2xl">Documents</h1>
          <p>Total documents = 12</p>
          <p>Uploaded this week = 3</p>
          <p>Last upload = 2 days ago</p>
        </div>

        <div className="space-y-3 bg-amber-50 p-7 rounded-3xl drop-shadow-md w-[30%]">
          <h1 className="font-medium text-2xl">Summaries</h1>
          <p>Total summaries = 64</p>
          <p>This week = 4</p>
          <p>Completion rate = 20%</p>
        </div>

        <div className="space-y-3 bg-amber-50 p-7 rounded-3xl drop-shadow-md w-[30%]">
          <h1 className="font-medium text-2xl">AI Chat</h1>
          <p>Total chats = 18</p>
          <p>This week = 5</p>
          <p>Last chat = Today</p>
        </div>

      </div>

      <div className="bg-white rounded-3xl drop-shadow-md p-8 text-left">
        <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>
        <p className="text-gray-600">
          No recent activity yet.
        </p>
        <p className="text-gray-500 mt-1">
          Upload a document or start a chat to get started.
        </p>
      </div>

    </div>
  );
}

export default Home;
