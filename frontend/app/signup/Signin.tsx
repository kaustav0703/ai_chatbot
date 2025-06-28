'use client';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  onFlip: () => void;
}

export default function Signin({ onFlip }: Props) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [form, setForm] = useState({ email: '', password: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/user/signin`, form);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error: any) {
      // Data does not exist
      if (error.response.status === 400) {
        alert(error.response.data.message);
        onFlip();
      }
      // Internal server error
      else if (error.response.status === 500) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg h-full w-full flex flex-col justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Sign In</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          placeholder="Password"
        />
        <button className="w-full bg-indigo-600 py-2 rounded-lg text-white font-semibold">
          Sign In
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-400">
        Don’t have an account?{' '}
        <button onClick={onFlip} className="text-indigo-400 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}