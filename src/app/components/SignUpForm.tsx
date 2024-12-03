"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignUpForm: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch("/api/createaccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstname, lastname, email, password }),
        });

        if (response.ok) {
            alert("Account created successfully!");

            // Automatically sign the user in after account creation
            const loginResponse = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (loginResponse?.ok) {
                router.push("/main"); // Redirect to main page
            } else {
                alert("Failed to log in. Please log in manually.");
                router.push("/login"); // Redirect to login page
            }
        } else {
            const data = await response.json();
            alert(data.message || "Failed to create account.");
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert("Something went wrong. Please try again.");
    }
};



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10" >
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <button
        onClick={() => router.push("/login")}
        className="text-green-600 hover:underline mt-4 w-full"
      >
        Back to Sign In
      </button>
    </div>
  );
};

export default SignUpForm;
