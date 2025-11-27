// components/LegalPages.jsx
import React, { useState } from "react";

// PedomanMediaSiber & KebijakanPrivasi (JSX-ready)
export function PedomanMediaSiber() {
    return (
        <main className="max-w-4xl mx-auto p-6 bg-zinc-100 border-spacing-x-20 border-r-2 border-b-2 rounded-2xl shadow-sm mt-28">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold">Pedoman Media Siber</h1>
                <p className="text-sm text-zinc-600 mt-1">Versi ringkas — mengikuti prinsip Dewan Pers</p>
            </header>

            <section className="space-y-4 text-zinc-800 md:p-4">
                <h2 className="text-xl font-medium">1. Ruang Lingkup</h2>
                <p>
                    Pedoman ini berlaku untuk semua konten yang dipublikasikan di situs, termasuk teks, gambar,
                    video, dan konten pengguna (UGC). Redaksi bertanggung jawab atas penerapan pedoman ini.
                </p>

                <h2 className="text-xl font-medium">2. Prinsip Jurnalistik</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Akurasi: Berita harus akurat dan dapat dipertanggungjawabkan.</li>
                    <li>Keberimbangan: Memberikan ruang yang proporsional bagi pihak terkait.</li>
                    <li>Independensi: Tidak tunduk pada kepentingan politik atau komersial.</li>
                    <li>Etika: Menjunjung standar Kode Etik Jurnalistik.</li>
                </ul>

                <h2 className="text-xl font-medium">3. Verifikasi</h2>
                <p>
                    Setiap informasi diverifikasi bila memungkinkan. Jika sumber belum tervalidasi, redaksi akan
                    menandai konten sebagai "dalam proses verifikasi" dan memperbarui saat konfirmasi tersedia.
                </p>

                <h2 className="text-xl font-medium">4. Kutipan & Sumber</h2>
                <p>
                    Pengambilan kutipan dari media lain diperbolehkan dalam batas wajar (kutipan singkat/parsial)
                    dengan mencantumkan sumber dan link ke artikel asli. Penyalinan penuh tanpa izin dilarang.
                </p>

                <h2 className="text-xl font-medium">5. Hak Jawab</h2>
                <p>
                    Pihak yang merasa dirugikan dapat mengajukan hak jawab kepada redaksi. Redaksi wajib
                    menanggapi dalam waktu wajar dan memberikan ruang yang layak untuk perbaikan atau klarifikasi.
                </p>

                <h2 className="text-xl font-medium">6. Koreksi</h2>
                <p>
                    Jika ditemukan kesalahan material, redaksi akan menerbitkan koreksi/ralat yang jelas dan
                    mudah ditemukan, serta menyertakan tanggal koreksi.
                </p>

                <h2 className="text-xl font-medium">7. Konten Pengguna (UGC)</h2>
                <p>
                    UGC adalah tanggung jawab pengirim. Redaksi berhak menyunting atau menghapus UGC yang melanggar
                    hukum, norma, atau pedoman internal.
                </p>

                <h2 className="text-xl font-medium">8. Iklan & Sponsorship</h2>
                <p>
                    Konten sponsor/advertorial harus diberi label jelas agar pembaca dapat membedakan antara
                    jurnalistik dan materi berbayar.
                </p>

                <h2 className="text-xl font-medium">9. Perlindungan Anak</h2>
                <p>
                    Identitas anak (nama lengkap, foto yang mudah dikenali, alamat) tidak akan ditayangkan dalam
                    kasus kekerasan atau tindak pidana kecuali atas izin eksplisit dan demi kepentingan anak.
                </p>

                <h2 className="text-xl font-medium">10. Penegakan</h2>
                <p>
                    Pelanggaran pedoman ini dapat dikenai tindakan mulai dari peringatan internal hingga pemutusan
                    kerja sama dengan kontributor eksternal.
                </p>

                <footer className="mt-6 text-sm text-zinc-600">
                    Dokumen ini disusun untuk kepatuhan jurnalistik dan dapat diperbarui sesuai kebijakan redaksi.
                </footer>
            </section>
        </main>
    );
}

export function KebijakanPrivasi() {
    return (
        <main className="max-w-4xl mx-auto p-6 bg-zinc-100 border-spacing-x-20 border-r-2 border-b-2 rounded-2xl shadow-sm mt-28">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold">Kebijakan Privasi</h1>
                <p className="text-sm text-zinc-600 mt-1">Versi ringkas — memuat praktik pengumpulan & penggunaan data</p>
            </header>

            <section className="space-y-4 text-zinc-800">
                <h2 className="text-xl font-medium">1. Informasi yang Kami Kumpulkan</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Data otomatis: alamat IP, tipe perangkat, browser, aktivitas halaman, cookie.</li>
                    <li>Data yang Anda berikan: formulir kontak, komentar, dan langganan newsletter.</li>
                </ul>

                <h2 className="text-xl font-medium">2. Penggunaan Data</h2>
                <p>Data digunakan untuk analitik, personalisasi konten, pengembangan layanan, dan keamanan situs.</p>

                <h2 className="text-xl font-medium">3. Cookies</h2>
                <p>Situs menggunakan cookies untuk meningkatkan pengalaman pengguna dan analitik. Pengunjung dapat menonaktifkannya melalui pengaturan browser.</p>

                <h2 className="text-xl font-medium">4. Berbagi Data dengan Pihak Ketiga</h2>
                <p>Kami bekerja sama dengan layanan pihak ketiga seperti Google Analytics dan platform iklan. Semua pihak ketiga tunduk pada kebijakan privasi mereka masing-masing.</p>

                <h2 className="text-xl font-medium">5. Keamanan Data</h2>
                <p>Kami menjaga data pengguna dengan langkah-langkah keamanan standar industri.</p>

                <h2 className="text-xl font-medium">6. Hak Pengguna</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Hak akses data</li>
                    <li>Hak untuk mengoreksi atau menghapus data</li>
                    <li>Hak untuk menarik persetujuan</li>
                </ul>

                <h2 className="text-xl font-medium">7. Perubahan Kebijakan</h2>
                <p>Kebijakan dapat diperbarui dan perubahan akan dipublikasikan di halaman ini.</p>

                <h2 className="text-xl font-medium">8. Kontak</h2>
                <p>
                    Untuk pertanyaan privasi, hubungi:
                    <a href="mailto:pcc@mojofolks.com" className="underline ml-1">
                        pcc@mojofolks.com
                    </a>
                </p>
                <p className="mt-2">
                    Atau WhatsApp/telepon:
                    <a href="https://wa.me/6285190652077" className="underline ml-1" target="_blank" rel="noopener noreferrer" >
                        +62 851-9065-2077
                    </a>
                </p>


                <footer className="mt-6 text-sm text-zinc-600">
                    Diperbarui: {new Date().toLocaleDateString()}
                </footer>
            </section>
        </main>
    );
}

// Viewer sederhana — tombol navigasi untuk men-switch halaman
export default function LegalPages() {
    const [page, setPage] = useState("pedoman");

    return (
        <div className="max-w-5xl mx-auto p-6">
            <nav className="mb-6 flex items-center gap-3">
                <button
                    onClick={() => setPage("pedoman")}
                    className={`px-4 py-2 rounded-lg ${page === "pedoman" ? "bg-blue-600 text-white" : "bg-zinc-100"}`}
                >
                    Pedoman Media Siber
                </button>
                <button
                    onClick={() => setPage("privasi")}
                    className={`px-4 py-2 rounded-lg ${page === "privasi" ? "bg-blue-600 text-white" : "bg-zinc-100"}`}
                >
                    Kebijakan Privasi
                </button>
            </nav>

            <div>{page === "pedoman" ? <PedomanMediaSiber /> : <KebijakanPrivasi />}</div>
        </div>
    );
}
