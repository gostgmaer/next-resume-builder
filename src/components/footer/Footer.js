import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Resume Builder</p>
      </div>
    </footer>
  );
}

export default Footer;
