import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../App';
import NewsCard from '../components/NewsCard'; 
import SidebarAd from '../components/SidebarAd';

const PostDetail = () => {
    // PERBAIKAN: Mengambil postSlug (dan categorySlug) dari URL baru
    const { categorySlug, postSlug } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Ambil Post Detail berdasarkan postSlug
                const postResponse = await fetch(`${API_BASE_URL}/posts?slug=${postSlug}&_embed`);
                if (!postResponse.ok) {
                    throw new Error('Gagal mengambil detail berita');
                }
                const postData = await postResponse.json();

                if (postData.length === 0) {
                    throw new Error('Berita tidak ditemukan (404)');
                }

                const currentPost = postData[0];
                setPost(currentPost);

                // 2. Ambil Related Posts berdasarkan Kategori
                const categoryId = currentPost?._embedded?.['wp:term']?.[0]?.[0]?.id;

                if (categoryId) {
                    const relatedResponse = await fetch(
                        `${API_BASE_URL}/posts?_embed&categories=${categoryId}&exclude=${currentPost.id}&per_page=3`
                    );
                    if (relatedResponse.ok) {
                        const relatedData = await relatedResponse.json();
                        setRelatedPosts(relatedData);
                    }
                }

            } catch (err) {
                setError(err.message);
                console.error("Error fetching post detail:", err);
            } finally {
                setLoading(false);
                // Scroll ke atas setelah memuat konten baru
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        // Dependensi: jalankan ulang ketika postSlug berubah
        fetchPostDetail();
    }, [postSlug]);

    if (loading) return <div className="text-center py-20 text-xl text-gray-500">Memuat konten berita...</div>;

    if (error || !post) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 py-20 text-center">
                <h1 className="text-4xl font-extrabold text-red-600">404 - Not Found</h1>
                <p className="text-xl text-gray-700 mt-4">Berita yang Anda cari tidak ditemukan.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    // Ambil metadata
    const title = post.title?.rendered || 'No Title';
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name || 'Admin';
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(post.date).toLocaleDateString('id-ID', dateOptions);

    


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

            {/* ---------------------------------------------------- */}
            {/* GRID UTAMA 3 KOLOM: IKLAN KIRI | KONTEN | IKLAN/SIDEBAR KANAN */}
            {/* ---------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] xl:grid-cols-[160px_auto_300px] gap-8">

                <div className="hidden lg:block">
                    {/* Sticky top-28 agar iklan tetap di tempat saat scrolling */}
                    <SidebarAd title="Iklan Kiri" />
                </div>

                {/* 2. Kolom Konten Utama (Main Content) */}
                <main className="w-full">
                    <article className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg">

                        {/* Tombol Kembali */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 text-red-600 hover:text-red-800 font-medium transition flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                            Kembali
                        </button>

                        {/* Kategori dan Metadata */}
                        <div className="flex items-center space-x-3 mb-2 text-sm font-medium text-gray-500">
                            {categories.filter(cat => cat.slug !== 'uncategorized').map((cat, index, arr) => (
                                <React.Fragment key={cat.id}>
                                    <Link to={`/${cat.slug}`} className="text-red-600 uppercase hover:text-red-800">
                                        {cat.name}
                                    </Link>
                                    {index < arr.length - 1 && <span>|</span>}
                                </React.Fragment>
                            ))}
                            <span>|</span>
                            <span>Oleh: {authorName}</span>
                            <span>|</span>
                            <span>{formattedDate}</span>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-xl md:text-2xl font-bold leading-tight text-gray-900 mb-6"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />

                        {/* Featured Image */}
                        {featuredImage && (
                            <div className="my-6 aspect-video overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={featuredImage}
                                    alt={title.replace(/<[^>]*>/g, '')}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Konten Berita (PENTING: dangerouslySetInnerHTML) */}
                        <div
                            className="prose prose-lg max-w-none mt-8 text-gray-800 leading-relaxed wp-content"
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />

                    </article>
                </main>

                {/* 3. Kolom Sidebar Kanan (Iklan Utama & Related Posts) */}
                <aside className="sticky w-full">
                    {/* Sticky Sidebar Container */}
                    <div className="top-24">
                        

                        {/* Iklan Placeholder Kanan (Sesuai dengan AdPlaceholder) - Tampil di Desktop */}
                        <div className="hidden lg:block">
                            {/* Sticky top-28 agar iklan tetap di tempat saat scrolling */}
                            <SidebarAd title="Iklan Kanan" />
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Berita Terkait</h3>
                                <div className="space-y-6">
                                    {relatedPosts.map((rPost) => (
                                        // Gunakan NewsCard untuk tampilan yang konsisten
                                        <NewsCard key={rPost.id} post={rPost} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default PostDetail;