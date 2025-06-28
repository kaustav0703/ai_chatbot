// app/page.tsx
import { Suspense } from 'react';
import HomeSection from './components/Home';
import ChatSection from './components/Chat';
import PricingSection from './components/Pricing';
import Auth from './signup/Auth';

export default function Home() {
  return (
    <div>
      <HomeSection />
      <ChatSection />
      <PricingSection />
      <div id="signup"> {/* Wrap Signup in a div with id */}
        <Suspense fallback={<div>Loading...</div>}>
          <Auth />
        </Suspense>
      </div>
    </div>
  );
}
