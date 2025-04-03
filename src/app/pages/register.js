import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      toast.success("Account created! Please login.");
      router.push("/");
    } catch (error) {
      toast.error("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2 border" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Register</button>
      </form>
    </div>
  );
}
