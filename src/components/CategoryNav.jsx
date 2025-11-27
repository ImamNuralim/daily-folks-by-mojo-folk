import React, { useState, useEffect } from 'react';
// Tambahkan useLocation agar kita bisa memeriksa rute saat ini
import { NavLink, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../App';

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // <--- BARU: Ambil objek lokasi saat ini

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Ambil kategori. Batasi 10 kategori teratas
        const response = await fetch(`${API_BASE_URL}/categories?per_page=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        
        // Filter kategori: hilangkan "Uncategorized"
        const filteredData = data.filter(cat => cat.slug !== 'uncategorized');
        
        // Tambahkan tombol 'Semua Berita' di awal
        const allNewsOption = { id: 'all', name: 'Semua Berita', slug: '/' };

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
    // PERBAIKAN SUDAH AMAN: Menggunakan slug
    return category.id === 'all' ? '/' : `/${category.slug}`; 
  };

  if (loading) return null; 

  return (
    <div className="w-full items-center mt-1 fixed py-3 z-10 mb-8 border-b border-t bg-white border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <nav className="flex justify-center">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={getCategoryLink(category)}
            // Gunakan fungsi isActive untuk menentukan style aktif
            className={({ isActive }) =>
              `inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition duration-200 ease-in-out ${
                // Logika Aktif: Aktif jika NavLink menganggapnya aktif, ATAU jika itu tombol 'Semua Berita' dan kita berada persis di root path '/'
                (isActive || (category.id === 'all' && location.pathname === '/'))
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
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