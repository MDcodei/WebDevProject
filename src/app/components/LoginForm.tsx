"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Make the function async so we can use await inside it
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use await here since the function is now async
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Don't let NextAuth handle redirection
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      // Success
      alert("Signed in successfully!");
      router.push("/main"); // Redirect to main page manually
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleContinueAsGuest = () => {
    // Handle guest logic if needed
    router.push("/main"); // Redirect to guest main page
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Sign In
        </button>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
      <div className="flex flex-col mt-4">
        <button
          onClick={() => router.push("/signup")}
          className="text-green-600 hover:underline"
        >
          Create an Account
        </button>
        <button
          onClick={handleContinueAsGuest}
          className="mt-2 text-grey-600 hover:underline"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginForm;