import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ post }) => {
  if (!post) return null;

  // Ambil data dari object post
  const title = post.title?.rendered || 'No Title';
  const postSlug = post.slug; // Mengganti 'slug' menjadi 'postSlug' agar lebih jelas
  
  // URL Featured Image (Cek _embedded)
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  // Nama Kategori dan ID (Ambil kategori pertama)
  const categoriesData = post?._embedded?.['wp:term']?.[0];
  const mainCategory = categoriesData ? categoriesData.find(cat => cat.slug !== 'uncategorized') || categoriesData[0] : null;

  const categoryName = mainCategory?.name || 'Uncategorized';
  const categorySlug = mainCategory?.slug || 'uncategorized'; // Ambil slug kategori
  
  // Format Tanggal
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', dateOptions);

  // URL BARU: /category-slug/post-slug
  const postUrl = `/${categorySlug}/${postSlug}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Gambar Berita */}
      <Link to={postUrl}>
        <div className="relative overflow-hidden aspect-video bg-gray-200">
          <img
            src={featuredImage || 'https://via.placeholder.com/600x350?text=No+Image'}
            alt={title.replace(/<[^>]*>/g, '')}
            className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* Kategori dan Tanggal */}
        <div className="flex justify-between items-center mb-2 text-xs font-medium">
          {mainCategory ? (
            <Link 
              to={`/${categorySlug}`} // Link kategori menggunakan slug
              className="text-red-600 uppercase hover:text-red-800 transition duration-150"
            >
              {categoryName}
            </Link>
          ) : (
            <span className="text-gray-500">{categoryName}</span>
          )}
          <span className="text-gray-500">{formattedDate}</span>
        </div>

        {/* Judul Berita */}
        <Link to={postUrl} className="flex-grow">
          <h3 
            className="text-lg font-semibold leading-snug text-gray-900 hover:text-red-600 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;