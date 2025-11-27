import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiInstagramFill, RiFacebookFill } from "@remixicon/react";

// Anda dapat mengganti SVG ini dengan ikon dari library seperti lucide-react atau react-icons
const SocialIcon = ({ Icon, href }) => (
    <a href={href} className="text-gray-400 hover:text-blue-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
        <Icon className="w-6 h-6" />
    </a>
);




const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 bg-gray-900 text-white border-t-8 border-blue-500">
            <div className="container mx-auto px-4 py-12">
                {/* Top Section: Grid Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">

                    {/* Column 1: Brand Info & Social Media */}
                    <div>
                        <Link to="/" className="text-2xl font-extrabold text-blue-800 tracking-tight">
                            <img src="/img/Folks-Daily-white-logo.png" alt="Folks Daily Logo" className="h-28" />
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Menyajikan berita terkini dan analisis mendalam dari seluruh dunia.
                        </p>
                        <div className="mt-6 flex space-x-4 text-2xl">
                            <SocialIcon Icon={RiFacebookFill} href="https://www.facebook.com/profile.php?id=61583297982477" />
                            <SocialIcon Icon={RiInstagramFill} href="https://www.instagram.com/folksdaily.id/" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-blue-500 mb-4">Navigasi Cepat</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Beranda</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Berita Utama</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Opini</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Ekonomi & Bisnis</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Teknologi</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal/Company Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-blue-500 mb-4">Informasi</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/tentang-kami" className="text-gray-400 hover:text-white hover:underline">
                                    Tentang Kami
                                </Link>
                            </li>

                            <li>
                                <Link to="/pedoman-media-siber" className="text-gray-400 hover:text-white hover:underline">
                                    Pedoman Media Siber
                                </Link>
                            </li>

                            <li>
                                <Link to="/kebijakan-privasi" className="text-gray-400 hover:text-white hover:underline">
                                    Kebijakan Privasi
                                </Link>
                            </li>

                            <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Hubungi Kami</a></li>

                        </ul>
                    </div>

                    {/* Column 4: Newsletter/Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-blue-500 mb-4">Langganan Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Dapatkan rangkuman berita harian terbaik langsung ke email Anda.
                        </p>
                        {/* Simple form placeholder */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="w-full p-2.5 rounded-t-md bg-gray-800 text-white border-b-2 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-0.5"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-b-md transition duration-200"
                            >
                                Berlangganan
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="text-center text-sm text-gray-400 pt-4">
                    &copy; {currentYear} Modern News Portal. All Rights Reserved. <br className="md:hidden" />
                    Powered by **WordPress API**.
                </div>
            </div>
        </footer>
    );
};

export default Footer;