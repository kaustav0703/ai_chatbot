'use client';
import { useState } from 'react';
import Signup from './page';
import Signin from './Signin';

export default function AuthCard() {
    const [showSignin, setShowSignin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT SIDE STATIC */}
        <div className="flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Now</h2>
          <p className="text-gray-400 text-lg max-w-md">
            Unlock premium features and elevate your experience with our powerful tools.
          </p>
          <p className="mt-6 text-sm text-gray-500">Already a member? Flip to sign in.</p>
        </div>

        {/* RIGHT SIDE FLIPPING CARD */}
        <div className="relative w-full h-[550px] perspective p-6">
          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
              showSignin ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT = SIGNUP */}
            <div className="absolute w-full h-full backface-hidden">
              <Signup onFlip={() => setShowSignin(true)} />
            </div>

            {/* BACK = SIGNIN */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <Signin onFlip={() => setShowSignin(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}