import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import NewsSlider from './components/NewsSlider';
import MainContent from './components/MainContent';
import PostDetail from './components/PostDetail';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import { PedomanMediaSiber, KebijakanPrivasi } from "./components/LegalPages";
import TentangKami from './components/TentangKami';
import SearchPage from './pages/SearchPage';
import SidebarAd from './components/SidebarAd';


// URL API WordPress yang akan kita gunakan
export const API_BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/imamnuralim.wordpress.com';

function HomePage() {
  // Gunakan useParams untuk mendeteksi apakah kita berada di rute kategori
  const { categorySlug } = useParams();
  
  // NewsSlider hanya akan ditampilkan jika categorySlug TIDAK ADA
  const isCategoryPage = !!categorySlug;

  return (
    <div className="container mx-auto px-2  lg:px-8 pt-20">
      <CategoryNav />
      
      {/* Container utama untuk slider dan grid */}
      <div className="flex flex-col lg:flex-row gap-6 mt-3">
        {/* Iklan Placeholder Kiri */}
        <aside className="hidden lg:block w-full lg:w-1/6 pt-20">
         <SidebarAd title="Iklan Kiri" />
        </aside>
       

        {/* Konten Utama (Berita Grid) */}
        <main className="w-full lg:w-4/6">
          {/* 1. Slider Berita: Tampilkan HANYA di Homepage utama (bukan kategori) */}
          {!isCategoryPage && (
            <NewsSlider />
          )}
          
          {/* 2. Main Content: Akan menampilkan grid (dengan atau tanpa filter) */}
          <MainContent />

        </main>

        {/* Iklan Placeholder Kanan */}
         <aside className="hidden lg:block w-full lg:w-1/6 sticky pt-20">
          <SidebarAd title="Iklan Kanan" />
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
        
        {/* 1. Rute Homepage Utama (/) */}
        <Route path="/" element={<HomePage />} />
        
        {/* 2. Rute Detail Post BARU: /:categorySlug/:postSlug */}
        {/* Ini harus diletakkan di atas rute kategori untuk memastikan prioritas pencocokan. */}
        <Route path="/:categorySlug/:postSlug" element={<PostDetail />} />
        <Route path="/search" element={<SearchPage />} /> 
        
        {/* 3. Rute Kategori: /:categorySlug */}
        <Route path="/:categorySlug" element={<HomePage />} />
        
        {/* Rute Legal Pages (tetap di bawah agar tidak konflik dengan :categorySlug) */}
        <Route path="/pedoman-media-siber" element={<PedomanMediaSiber />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="*" element={<div className="container mx-auto text-center py-20">404 - Halaman Tidak Ditemukan</div>} />
        {/* Rute Pencarian */}

      </Routes>

      {/* Footer Placeholder */}
      <Footer />
    </>
  );
}

export default App;