import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../App';
import NewsCard from './NewsCard';

const MainContent = () => {
  const { id: categoryId } = useParams(); // Ambil category ID dari URL jika ada
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  // Efek berjalan saat komponen dimuat atau categoryId berubah
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      setPosts([]);

      try {
        // Tentukan endpoint berdasarkan apakah ada categoryId
        let endpoint = `${API_BASE_URL}/posts?_embed&per_page=10`;
        
        if (categoryId) {
          endpoint = `${API_BASE_URL}/posts?_embed&per_page=10&categories=${categoryId}`;
          
          // Ambil nama kategori untuk ditampilkan
          const categoryResponse = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
          if (categoryResponse.ok) {
            const catData = await categoryResponse.json();
            setCategoryName(catData.name);
          } else {
            setCategoryName('Kategori Tidak Ditemukan');
          }
        } else {
          setCategoryName('Berita Terbaru'); // Default untuk homepage
        }

        // Ambil Posts
        const postsResponse = await fetch(endpoint);
        if (!postsResponse.ok) {
          throw new Error('Gagal mengambil data berita');
        }
        const data = await postsResponse.json();
        setPosts(data);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching main content posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // Scroll ke atas setiap kali konten utama di-reload (misalnya saat ganti kategori)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [categoryId]); // Dependensi: hanya akan dijalankan ulang jika categoryId berubah

  return (
    <section className="pb-8">
      {/* Judul Bagian */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
        {categoryName.toUpperCase()}
      </h2>
      
      {loading && <div className="text-center py-8 text-gray-500">Memuat berita...</div>}
      {error && <div className="text-center py-8 text-blue-500">Error: {error}</div>}
      
      {!loading && posts.length === 0 && (
        <div className="text-center py-8 text-gray-500 border border-dashed p-6 rounded-lg">
          Tidak ada berita dalam kategori ini.
        </div>
      )}

      {/* Grid Berita Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Placeholder Paging (Belum diimplementasikan, tapi disiapkan) */}
      {posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Muat Berita Lainnya
          </button>
        </div>
      )}
    </section>
  );
};

export default MainContent;