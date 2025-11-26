import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsSlider from './components/NewsSlider';
import MainContent from './components/MainContent';
import PostDetail from './components/PostDetail';
import CategoryNav from './components/CategoryNav';

// URL API WordPress yang akan kita gunakan
export const API_BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/imamnuralim.wordpress.com';

function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
     <CategoryNav /> 
      {/* Slider berita untuk 5 post terbaru */}
      
      
      

      <div className="flex flex-col lg:flex-row gap-6 mt-3">
        {/* Iklan Placeholder Kiri (Hanya sebagai contoh) */}
        <aside className="hidden lg:block w-full lg:w-1/6 ">
          <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed border-gray-400 text-sm text-gray-600 sticky pt-20 top-40">
            ADVERTISEMENT LEFT
          </div>
        </aside>

        {/* Konten Utama (Berita Grid) */}
        <main className="w-full lg:w-4/6">
        <NewsSlider />
          <MainContent />
          
        </main>

        {/* Iklan Placeholder Kanan (Hanya sebagai contoh) */}
        <aside className="hidden lg:block w-full lg:w-1/6">
          <div className="bg-gray-100 h-64 flex items-center justify-center border border-dashed border-gray-400 text-sm text-gray-600 sticky pt-20 top-40">
            ADVERTISEMENT RIGHT
          </div>
        </aside>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Header /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Rute untuk detail post berdasarkan slug */}
        <Route path="/post/:slug" element={<PostDetail />} />
        {/* Rute untuk filter post berdasarkan category ID */}
        <Route path="/category/:id" element={<HomePage />} />
      </Routes>
      
      {/* Footer Placeholder */}
      <footer className="mt-12 py-6 bg-gray-900 text-white text-center">
        &copy; {new Date().getFullYear()} Modern News Portal - Powered by WordPress API
      </footer>
    </>
  );
}

export default App;