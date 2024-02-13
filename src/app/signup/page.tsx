"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // console.log("userData==>", userData);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  // console.log("btnDisabled==>", btnDisabled);

  const router = useRouter();

  useEffect(() => {
    if (
      userData.username.length === 0 ||
      userData.email.length === 0 ||
      userData.password.length === 0
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [userData.username, userData.email, userData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      console.log("submit click");

      e.preventDefault();

      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData }),
      });

      if (response.ok) {
        console.log("response data ==>" , await response.json())
        router.push("/login")
      } 
    } catch (error) {
      console.log("error while submiting user data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col item-center justify-center h-auto">
        <div className="w-full bg-[#222] ">
          <h1 className="text-[28px] font-bold text-white mb-6 text-center">
            SignUp
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4 m-auto flex flex-col">
              <label className="text-white mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="bg-gray-700 text-white border-0 rounded-md p-2  focus:bg-gray-600 focus-outline-none transition ease-in-out duration-150 placeholder-gray-300"
                name="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>
            <div className="mb-4 m-auto flex flex-col">
              <label className="text-white mb-1">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                className="bg-gray-700 text-white border-0 rounded-md p-2  focus:bg-gray-600 focus-outline-none transition ease-in-out duration-150 placeholder-gray-300"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4 m-auto flex flex-col">
              <label className="text-white mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter email"
                className="bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus-outline-none transition ease-in-out duration-150 placeholder-gray-300"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>

            <div className="mb-4 m-auto flex flex-col">
              <button
                className="font-medium text-white bg-gray-600 pl-6 pr-6 pt-2 pb-2 rounded-full hover:bg-black transition ease-in duration-300 disabled:bg-red-400"
                type="submit"
                disabled={btnDisabled}
              >
                Submit
              </button>
            </div>
            <p className="text-white text-center mb-4">
              Alredy have an account ?{" "}
              <Link href="/login" className="text-white hover:underline ">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
