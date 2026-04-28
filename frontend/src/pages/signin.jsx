import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Signin = () => {
  const [state, setState] = useState("login");

  const { setuser, settoken, setshowlogin, backendurl } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (state === "login") {
        const res = await axios.post(`${backendurl}/api/auth/login`, {
          email,
          password,
        });
        data = res.data;
      } else {
        const res = await axios.post(`${backendurl}/api/auth/register`, {
          name,
          email,
          password,
        });
        data = res.data;
      }

      if (data.success) {
        settoken(data.token);
        setuser(data.user);
        localStorage.setItem("token", data.token);
        setshowlogin(false);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a]">

      {/* Card */}
      <form
        onSubmit={onsubmitHandler}
        className="bg-[#020617] border border-gray-800 w-[90%] max-w-md rounded-2xl shadow-xl p-8 text-white"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          {state === "login" ? "Welcome Back 👋" : "Create Account"}
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          {state !== "login" && (
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 bg-gray-900 border border-gray-700 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 bg-gray-900 border border-gray-700 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 bg-gray-900 border border-gray-700 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg text-sm font-medium transition"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>
        </div>

        {/* Toggle */}
        <p className="mt-5 text-center text-sm text-gray-400">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Signin;