'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

const sections = ['home', 'chat', 'pricing', 'signup'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md shadow-lg transition-all">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div>
          <a onClick={(e) => handleScrollTo(e, 'home')} className="block cursor-pointer">
            <img
              src="/chat_logo.png"
              alt="Chat Logo"
              className="w-32 h-20 object-contain sm:w-28 sm:h-16 md:w-32 md:h-20"
            />
          </a>
        </div>
        <ul className="flex space-x-6 items-center text-lg font-medium text-gray-200">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleScrollTo(e, id)}
                className={clsx(
                  'hover:text-white transition duration-300',
                  activeSection === id && 'text-blue-400 font-bold'
                )}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/signin"
              scroll={false}
              className="ml-4 px-4 py-2 border border-blue-500 rounded-full text-blue-400 hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
