import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../App';

const NewsSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Index slide aktif

  useEffect(() => {
    const fetchSliderPosts = async () => {
      try {
        // Ambil 5 post terbaru, dan pastikan data embed (featured image, category) disertakan
        const response = await fetch(`${API_BASE_URL}/posts?_embed&per_page=5`);
        if (!response.ok) {
          throw new Error('Failed to fetch slider posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching slider posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderPosts();

    // Otomatis pindah slide setiap 5 detik
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 5); // 5 adalah jumlah post
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Memuat berita utama...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Gagal memuat: {error}</div>;
  if (posts.length === 0) return <div className="text-center py-10 text-gray-500">Tidak ada berita untuk ditampilkan.</div>;

  const totalSlides = posts.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Ambil data post yang sedang aktif
  const activePost = posts[currentSlide];

  // LOGIC PENENTUAN LINK BARU (diambil dari NewsCard.jsx)
  const categoriesData = activePost?._embedded?.['wp:term']?.[0];
  // Cari kategori utama (kecuali 'uncategorized') atau ambil yang pertama
  const mainCategory = categoriesData ? categoriesData.find(cat => cat.slug !== 'uncategorized') || categoriesData[0] : null;
  
  const categoryName = mainCategory?.name || 'Uncategorized';
  const categorySlug = mainCategory?.slug || 'uncategorized'; // Ambil slug kategori
  
  // URL BARU: /category-slug/post-slug
  const postUrl = `/${categorySlug}/${activePost.slug}`;
  
  // URL Featured Image (Cek apakah ada _embedded, wp:featuredmedia, dan source_url)
  const featuredImage = activePost?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return (
    <div className="relative w-auto overflow-hidden rounded-lg shadow-xl mb-8 group mt-20">
      {/* 1. Konten Slider Aktif */}
      <div className="relative w-full h-96 sm:h-[450px] md:h-[550px]">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out" 
          style={{ 
            backgroundImage: `url(${featuredImage || 'https://via.placeholder.com/1200x600?text=No+Image'})`,
            // Efek zoom ringan pada background
            transform: currentSlide !== -1 ? 'scale(1.05)' : 'scale(1)', 
            backgroundColor: featuredImage ? 'transparent' : '#ccc', 
          }}
        ></div>
        {/* Gradient Overlay untuk teks lebih jelas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full lg:w-3/4">
          {mainCategory && (
              <Link 
              // PERBAIKAN: Link kategori menggunakan slug
              to={`/${categorySlug}`}
              className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-150"
            >
              {categoryName}
            </Link>
          )}
          
          <Link to={postUrl}> {/* PERBAIKAN: Menggunakan postUrl yang baru */}
            <h2 
              className="text-white text-2xl md:text-5xl font-extrabold leading-tight hover:text-red-300 transition duration-300"
              dangerouslySetInnerHTML={{ __html: activePost.title.rendered }}
            />
          </Link>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            {/* Tampilkan excerpt singkat, potong jika terlalu panjang */}
            {activePost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>
        </div>
      </div>

      {/* 2. Tombol Navigasi Slider (Tampil saat hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-red-600 transition duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" /></svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-red-600 transition duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12 8.25 19.5" /></svg>
      </button>

      {/* 3. Indikator Slide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-red-600 w-6' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSlider;