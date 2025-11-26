import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { API_BASE_URL } from '../App';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk menu mobile

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Ambil kategori. Batasi 6 kategori teratas saja.
        const response = await fetch(`${API_BASE_URL}/categories?per_page=6`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        
        // Filter kategori yang memiliki nama yang tidak kosong dan bukan "Uncategorized"
        const filteredData = data.filter(cat => cat.name !== 'Uncategorized');
        setCategories(filteredData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    // Header dibuat sticky dan diletakkan di atas (z-50)
    <header className="fixed top-0 left-0 w-full bg-white z-50 pt-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <Link to="/" className="text-2xl font-extrabold text-blue-800 tracking-tight">
            <img src="/img/Folks-Daily-logo.png" alt="Folks Daily Logo" className="h-40" />
          </Link>

          {/* 2. Desktop Navigation (Kategori Dinamis) */}
          

          {/* 3. Search Bar (Hanya Tampilan, Logika Pencarian Belum Diimplementasikan) */}
          <div className="hidden md:flex items-center space-x-4">
            <input
              type="search"
              placeholder="Cari berita..."
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500 w-40"
            />
            <button className="text-gray-600 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-red-600" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-50 border-t border-gray-200`}>
        <nav className="px-2 pt-2 pb-3 space-y-1">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.id}`}
              onClick={() => setIsMenuOpen(false)} // Tutup menu setelah klik
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                  isActive ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;