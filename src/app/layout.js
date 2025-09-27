import Mobileheader from './components/Mobileheader';
import MobileNav from './components/MobileNav';
import './globals.css';

export const metadata = {
  title: 'Vrober - Web Solutions',
  description: 'Building innovative web solutions for the modern world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Mobileheader />
        <MobileNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
