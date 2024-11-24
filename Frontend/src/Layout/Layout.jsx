import React from 'react';
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      
      {/* Main Content Area */}
      <main>
        {children}
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default Layout;
