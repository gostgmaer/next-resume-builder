import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'} className="text-3xl font-semibold">Resume Builder</Link>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-lg">Home</li>
            <li className="text-lg">Features</li>
            <li className="text-lg">Pricing</li>
            <li className="text-lg">Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
