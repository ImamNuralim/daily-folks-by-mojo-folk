import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ post }) => {
  if (!post) return null;

  // Ambil data dari object post
  const title = post.title?.rendered || 'No Title';
  const slug = post.slug;
  
  // URL Featured Image (Cek _embedded)
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  // Nama Kategori dan ID (Ambil kategori pertama)
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  const categoryName = category?.name || 'Uncategorized';
  const categoryId = category?.id;

  // Format Tanggal
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', dateOptions);

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Gambar Berita */}
      <Link to={`/post/${slug}`}>
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
          {categoryId ? (
            <Link 
              to={`/category/${categoryId}`}
              className="text-blue-600 uppercase hover:text-blue-800 transition duration-150"
            >
              {categoryName}
            </Link>
          ) : (
            <span className="text-gray-500">{categoryName}</span>
          )}
          <span className="text-gray-500">{formattedDate}</span>
        </div>

        {/* Judul Berita */}
        <Link to={`/post/${slug}`} className="flex-grow">
          <h3 
            className="text-xl font-bold leading-snug text-gray-900 hover:text-blue-600 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;