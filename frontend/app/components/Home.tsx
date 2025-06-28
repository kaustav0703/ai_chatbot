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
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(to right, #4f46e5 4%, #818cf8 50%, #4f46e5 96%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-10 w-10 text-indigo-400 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-float">
          Your AI Assistant, Ready 24/7
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 animate-shimmer">
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
