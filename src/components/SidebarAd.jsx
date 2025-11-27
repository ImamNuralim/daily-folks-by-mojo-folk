// src/components/SidebarAdDetail.jsx
import React from 'react';

// Komponen ini berfungsi sebagai placeholder sederhana untuk iklan di sidebar
const SidebarAdDetail = ({ title = "Iklan Samping" }) => {
  return (
    <div className="hidden lg:block lg:sticky lg:top-[9rem]"> 
      {/* Sticky top-[9rem] agar iklan tetap terlihat saat scrolling */}
      <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg shadow-inner mb-6">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">{title}</p>
        <div className="h-64 flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-500 text-xs">300x600 px (Placeholder)</span>
        </div>
      </div>
      
      {/* Iklan kedua (opsional) */}
      <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg shadow-inner">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Iklan Populer</p>
        <div className="h-40 flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-500 text-xs">300x300 px (Placeholder)</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdDetail;