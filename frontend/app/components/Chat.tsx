'use client';

import { useState, useEffect, useRef } from 'react';
import { Spinner } from './Spinner';
import { Copy, Check } from 'lucide-react';
import axios from 'axios';


export default function ChatSection() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);



  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;

    setChatLog(prev => [...prev, { sender: 'You', text: message }]);
    setMessage('');

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/chat/', { message }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      const reply = await response.data.reply;
      setChatLog(prev => [...prev, { sender: 'AI', text: reply }]);
    } catch (error) {
      console.error(error);
      setChatLog(prev => [...prev, { sender: 'AI', text: 'Something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="chat"
      className="scroll-mt-24 w-full min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-4xl bg-gray-800 shadow-2xl rounded-2xl p-6 flex flex-col h-[80vh]">
        <h2 className="text-4xl font-bold text-center mb-6">💬 Chat with AI</h2>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-2 space-y-4 mb-4 scrollbar-none"
        >

          {chatLog.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-full w-full text-2xl font-semibold text-gray-400 overflow-hidden">
              <div className="animate-slide-in whitespace-nowrap">
                💬 Start the conversation by typing a message...
              </div>
            </div>
          )}


          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`flex ${entry.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative group rounded-xl px-4 py-2 max-w-[70%] text-base ${entry.sender === 'You'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-green-600 text-white rounded-bl-none'
                  }`}
              >
                <span className="block mb-1 font-semibold">
                  {entry.sender === 'You' ? '🧑 You' : '🤖 AI'}
                </span>
                <p className="whitespace-pre-wrap">{entry.text}</p>

                {/* Copy/Check Icon */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(entry.text);
                    setCopiedIndex(index);
                    setTimeout(() => setCopiedIndex(null), 2000); // reset after 2 sec
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-gray-200"
                  title={copiedIndex === index ? 'Copied!' : 'Copy message'}
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center items-center">
              <Spinner
                variant="ripple"
                size="h-16 w-16"
                colorClass="border-blue-400"
                className="my-4"
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="flex items-center gap-3 mt-2 justify-center">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full max-w-md border border-gray-600 bg-gray-700 text-white rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full transition-all bg-[length:200%] bg-left hover:bg-right duration-500 font-medium"
          >
            🚀 Send
          </button>
        </form>
      </div>
    </section>
  );
}
