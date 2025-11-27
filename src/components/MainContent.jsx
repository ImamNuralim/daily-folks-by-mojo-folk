import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../App';
import NewsCard from './NewsCard';

const MainContent = () => {
  // Mengambil categorySlug dari URL (bisa undefined di homepage)
  const { categorySlug } = useParams();

  // State untuk data berita
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk Pagination (BARU)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Status loading untuk 'Load More'

  // State untuk menyimpan ID kategori (diperlukan untuk filter API)
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('Berita Terbaru');

  // -----------------------------------------------------------
  // 1. Fungsi untuk Mendapatkan ID Kategori Berdasarkan Slug
  // -----------------------------------------------------------
  const fetchCategoryInfo = useCallback(async (slug) => {
    if (!slug) {
      setCategoryId(null);
      setCategoryName('Berita Terbaru');
      return;
    }

    try {
      // Ambil detail kategori berdasarkan slug
      const catResponse = await fetch(`${API_BASE_URL}/categories?slug=${slug}`);
      if (!catResponse.ok) {
        throw new Error('Gagal mengambil kategori');
      }
      const catData = await catResponse.json();

      if (catData.length > 0) {
        setCategoryId(catData[0].id);
        setCategoryName(catData[0].name);
      } else {
        // Jika slug tidak ditemukan, atur ke default homepage
        setCategoryId(null);
        setCategoryName('Berita Terbaru');
      }
    } catch (err) {
      console.error("Error fetching category info:", err);
      // Fallback ke homepage jika error
      setCategoryId(null);
      setCategoryName('Berita Terbaru');
    }
  }, []);

  // -----------------------------------------------------------
  // 2. Fungsi Utama untuk Fetching Berita
  // -----------------------------------------------------------
  const fetchPosts = useCallback(async (targetPage, isLoadMore = false) => {
    if (isLoadMore) {
        setIsFetchingMore(true);
    } else {
        setLoading(true);
        setPosts([]); // Kosongkan array saat loading utama
    }
    setError(null);

    let apiUrl = `${API_BASE_URL}/posts?_embed&per_page=10&page=${targetPage}`;
    
    // Tambahkan filter kategori jika ID kategori tersedia
    if (categoryId) {
        apiUrl += `&categories=${categoryId}`;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Gagal memuat berita: ${response.statusText}`);
        }
        
        // Baca header total halaman dari API (PENTING untuk pagination)
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        if (totalPagesHeader) {
            setTotalPages(parseInt(totalPagesHeader, 10));
        }

        const data = await response.json();
        
        // Jika ini adalah 'Load More', gabungkan (append) data baru
        if (isLoadMore) {
            setPosts((prevPosts) => [...prevPosts, ...data]);
        } else {
            // Jika ini adalah loading awal, ganti data
            setPosts(data);
        }
    } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
    } finally {
        setLoading(false);
        setIsFetchingMore(false);
    }
  }, [categoryId]);

  // -----------------------------------------------------------
  // 3. Efek untuk Mengambil Info Kategori (ketika slug berubah)
  // -----------------------------------------------------------
  useEffect(() => {
    // Ketika categorySlug berubah, kita reset page ke 1 dan ambil info kategori baru
    setPage(1);
    fetchCategoryInfo(categorySlug);
  }, [categorySlug, fetchCategoryInfo]);


  // -----------------------------------------------------------
  // 4. Efek untuk Fetching Berita (ketika categoryId/page berubah)
  // -----------------------------------------------------------
  useEffect(() => {
    // Hanya jalankan fetching jika categoryId sudah diselesaikan (bisa null atau ID)
    if (categoryId !== null || !categorySlug) {
        // Jika page == 1, ini adalah loading awal (atau ganti kategori)
        if (page === 1) {
            fetchPosts(1, false);
        } 
        // Jika page > 1, ini adalah 'Load More'
        else if (page > 1) {
            fetchPosts(page, true);
        }
    }
  }, [categoryId, page, categorySlug, fetchPosts]);

  // -----------------------------------------------------------
  // 5. Handler Klik Tombol Load More
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    if (page < totalPages && !isFetchingMore) {
        setPage((prevPage) => prevPage + 1);
    }
  };


  // Tampilan UI
  if (loading && page === 1) {
    return <div className="text-center py-10 text-xl text-gray-500">Memuat berita...</div>;
  }

  return (
    <section className="mt-6">
      {/* Judul Utama Konten (Berita Terbaru atau Nama Kategori) */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
        {categoryName}
      </h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      {/* Grid Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))
        ) : (
          !loading && <div className="col-span-full text-center py-10 text-gray-500 text-lg">Tidak ada berita dalam kategori ini.</div>
        )}
      </div>
      
      {/* Loading Indicator untuk Load More */}
      {isFetchingMore && (
        <div className="text-center py-4 text-red-600 font-medium">
            Memuat berita tambahan...
        </div>
      )}

      {/* Tombol Load More */}
      {totalPages > 1 && page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingMore}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition duration-300 shadow-md 
              ${isFetchingMore 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-red-600 text-white hover:bg-red-700 active:shadow-xl'
              }`
            }
          >
            {isFetchingMore ? 'Loading...' : 'Muat Berita Lainnya'}
          </button>
        </div>
      )}
      
      {/* Indikator Semua Berita Dimuat */}
      {page >= totalPages && totalPages > 1 && (
        <div className="text-center mt-8 text-gray-500 py-2 border-t border-gray-200">
          Semua berita sudah termuat.
        </div>
      )}
      
    </section>
  );
};

export default MainContent;