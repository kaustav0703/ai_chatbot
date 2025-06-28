'use client';

import { useState } from 'react';
import axios from 'axios';
import { UserPlus } from 'lucide-react';

interface Props {
  onFlip: () => void;
}

export default function Signup({ onFlip }: Props) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/user/signup`, form);
      if (response.status === 201 || response.status === 200) {
        console.log('jasl;knmkasmkasmlkasmlkasnmkmaskmaslkasm');
        alert(response.data.message);
        onFlip(); // Flip to sign-in
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
      <div className="text-center">
        <UserPlus className="mx-auto text-indigo-400 mb-2" size={40} />
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          required
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          required
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        />
        <label className="flex items-center text-sm text-gray-400">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Show Password
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-400">
        Already have an account?{' '}
        <button onClick={onFlip} className="text-indigo-400 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
}
