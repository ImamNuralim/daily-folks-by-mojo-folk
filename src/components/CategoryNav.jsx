import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { API_BASE_URL } from '../App';

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Ambil kategori. Batasi 10 kategori teratas
        const response = await fetch(`${API_BASE_URL}/categories?per_page=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        
        // Filter kategori: tambahkan opsi "Semua Berita" dan hilangkan "Uncategorized"
        const filteredData = data.filter(cat => cat.name !== 'Uncategorized');
        
        // Tambahkan tombol 'Semua Berita' di awal
        const allNewsOption = { id: 'all', name: 'Semua Berita', link: '/' };

        setCategories([allNewsOption, ...filteredData]);
      } catch (err) {
        console.error("Error fetching categories for nav:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  // Fungsi untuk menentukan rute NavLink
  const getCategoryLink = (category) => {
      return category.id === 'all' ? '/' : `/category/${category.id}`;
  };

  if (loading) return null; // Jangan tampilkan apa-apa jika masih loading

  return (
    <div className="w-full items-center mt-1 fixed py-3 z-10 mb-8 border-b border-t bg-white border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <nav className="flex justify-center">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={getCategoryLink(category)}
            // Gunakan fungsi isActive untuk menentukan style aktif
            className={({ isActive, isPending }) =>
                `inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition duration-200 ease-in-out ${
                  (isActive || (category.id === 'all' && location.pathname === '/' && !location.pathname.startsWith('/category/'))) 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                }`
            }
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategoryNav;