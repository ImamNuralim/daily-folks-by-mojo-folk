// src/pages/SearchPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../App';
import NewsCard from '../components/NewsCard'; // Mengimpor dari components
import SidebarAd from '../components/SidebarAd'; // IMPOR KOMPONEN BARU

// Fungsi untuk membaca query parameter 's' dari URL
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
    const query = useQuery();
    const searchTerm = query.get('s'); // Mengambil kata kunci dari ?s=keyword
    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State untuk Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // -----------------------------------------------------------
    // Fungsi Utama untuk Fetching Hasil Pencarian (Tidak Berubah)
    // -----------------------------------------------------------
    const fetchSearchResults = useCallback(async (targetPage, isLoadMore = false) => {
        // Pastikan ada kata kunci pencarian yang valid
        if (!searchTerm || searchTerm.trim() === "") {
            setLoading(false);
            setPosts([]);
            return;
        }

        if (isLoadMore) {
            setIsFetchingMore(true);
        } else {
            setLoading(true);
            setPosts([]); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
        setError(null);

        // URL API dengan parameter search dan pagination. Ini adalah kunci filtering.
        const apiUrl = `${API_BASE_URL}/posts?_embed&search=${encodeURIComponent(searchTerm)}&per_page=10&page=${targetPage}`;
        
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Gagal memuat hasil pencarian (Code: ${response.status}): ${response.statusText}`);
            }
            
            // Baca header total halaman
            const totalPagesHeader = response.headers.get('X-WP-TotalPages');
            if (totalPagesHeader) {
                setTotalPages(parseInt(totalPagesHeader, 10));
            }

            const data = await response.json();
            
            if (isLoadMore) {
                setPosts((prevPosts) => [...prevPosts, ...data]);
            } else {
                setPosts(data);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching search results:", err);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    }, [searchTerm]); 

    // Efek-efek lainnya (Tidak Berubah)
    useEffect(() => {
        if (page === 1) {
             fetchSearchResults(1, false);
        } else if (page > 1) {
             fetchSearchResults(page, true);
        }
    }, [searchTerm, page, fetchSearchResults]);

    useEffect(() => {
        setPage(1);
    }, [location.search]);

    const handleLoadMore = () => {
        if (page < totalPages && !isFetchingMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    // Tampilan UI
    const isInitialLoad = loading && page === 1;

    if (!searchTerm) {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 py-20 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800">Cari Berita</h1>
                <p className="text-xl text-gray-700 mt-4">Silakan masukkan kata kunci di kolom pencarian di Header.</p>
            </div>
        );
    }
    
    if (isInitialLoad) {
        return <div className="text-center py-20 text-xl text-gray-500">Mencari "{searchTerm}"...</div>;
    }

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                Hasil Pencarian untuk: <span className="text-red-600">"{searchTerm}"</span>
            </h1>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            {/* STRUKTUR TIGA KOLOM (GRID) - TELAH DIUBAH menjadi lg:grid-cols-3 untuk rasio 1:1:1 */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] lg:gap-8">
                
                {/* Kolom Kiri: Iklan Sidebar 1 (1/3 lebar) */}
                <div className="hidden lg:block">
                    {/* Sticky top-28 agar iklan tetap di tempat saat scrolling */}
                    <SidebarAd title="Iklan Kiri" />
                </div>

                {/* Kolom Tengah: Konten Hasil Pencarian (1/3 lebar) */}
                {/* Class lg:col-span-2 telah dihapus. Konten mengambil 1 kolom penuh (1/3 lebar) */}
                <div> 
                    
                    {/* Grid Berita Hasil Pencarian */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <NewsCard key={post.id} post={post} />
                            ))
                        ) : (
                            !isInitialLoad && <div className="col-span-full text-center py-10 text-gray-500 text-lg">Tidak ada berita yang cocok dengan kata kunci Anda.</div>
                        )}
                    </div>

                    {/* Pagination dan Load More */}
                    {isFetchingMore && (
                        <div className="text-center py-4 text-red-600 font-medium">
                            Memuat hasil tambahan...
                        </div>
                    )}

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
                                {isFetchingMore ? 'Loading...' : 'Muat Hasil Lainnya'}
                            </button>
                        </div>
                    )}

                    {page >= totalPages && totalPages > 1 && (
                        <div className="text-center mt-8 text-gray-500 py-2 border-t border-gray-200">
                            Semua hasil pencarian sudah termuat.
                        </div>
                    )}
                </div>

                {/* Kolom Kanan: Iklan Sidebar 2 (1/3 lebar) */}
                <div className="hidden lg:block">
                    {/* Sticky top-28 agar iklan tetap di tempat saat scrolling */}
                    <SidebarAd title="Iklan Kanan" />
                </div>
            </div> {/* END OF GRID */}

        </div>
    );
};

export default SearchPage;