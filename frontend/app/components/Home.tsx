'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, MessageSquareText } from 'lucide-react';

export default function HomeSection() {
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="scroll-mt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 text-white"
    >
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-10 w-10 text-indigo-400 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your AI Assistant, Ready 24/7
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Chat instantly with a powerful AI for answers, ideas, or support. Whether you're a developer, student, or simply curious — this assistant is always on.
        </p>

        <button
          onClick={scrollToChat}
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          <MessageSquareText className="h-5 w-5" />
          Chat Now
        </button>
      </div>
    </section>
  );
}
