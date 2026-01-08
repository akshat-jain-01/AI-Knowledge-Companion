import React from "react";

const Login = () => {
  return (
    <div className="h-screen w-screen bg-green-300 flex items-center justify-center">
      <form onSubmit={onSubmitHandler} className="bg-amber-200 w-[90%] max-w-md rounded-3xl shadow-lg p-8">
        
        <h1 className="text-4xl font-bold text-black text-center mb-8">
          Sign Up
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            className="bg-white w-full py-3 border-2 border-black rounded-full px-5 text-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white w-full py-3 border-2 border-black rounded-full px-5 text-lg"
          />

          <button className="bg-blue-500 text-white w-full py-3 rounded-full text-xl font-semibold hover:bg-blue-600 transition">
            Sign Up
          </button>

        </div>

        <p className="text-center mt-6 text-black">
          Already have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </form >
    </div>
  );
};

export default Login;
