import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    // TODO: API call yaha karega
  };

  return (
    <div className="h-screen w-screen m-5 rounded-2xl bg-gray-200 flex items-center justify-center">
      
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>

        </div>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;