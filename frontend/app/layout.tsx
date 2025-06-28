// app/layout.tsx
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children: children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}