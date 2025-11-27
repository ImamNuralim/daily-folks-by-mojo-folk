export default function TentangKami() {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-zinc-100 border-spacing-x-20 border-r-2 border-b-2 rounded-2xl shadow-sm mt-28">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Tentang Kami</h1>
        <p className="text-gray-600 mt-1">Profil singkat dan visi kami sebagai media informasi modern.</p>
      </header>

      <section className="space-y-4 text-gray-800">
        <p>
          <strong>Folks Daily</strong> adalah platform media informasi digital yang menghadirkan
          berita, artikel, dan konten aktual dari berbagai sumber terpercaya. Kami berkomitmen untuk
          menyajikan informasi yang relevan, akurat, dan mudah dipahami oleh semua kalangan.
        </p>

        <p>
          Fokus kami adalah memberikan perspektif yang jernih terhadap isu-isu yang berkembang,
          mencakup topik seperti teknologi, bisnis, gaya hidup, hiburan, hingga perkembangan terbaru
          dari dalam dan luar negeri. Setiap konten yang dipublikasikan telah melewati kurasi dan
          seleksi ketat untuk memastikan kualitas serta kredibilitas sumber.
        </p>

        <p>
          Sebagai media berbasis digital, kami mengutamakan kecepatan publikasi tanpa mengorbankan
          prinsip dasar jurnalistik. Folks Daily juga terus berkembang mengikuti standar media modern,
          termasuk kepatuhan pada <em>Pedoman Media Siber</em> dan praktik editorial yang etis.
        </p>

        <h2 className="text-xl font-medium mt-6">Bagian dari Mojo Folks</h2>
        <p>
          Folks Daily merupakan bagian dari <strong>Mojo Folks</strong>, sebuah studio digital dan
          teknologi yang berfokus pada pengembangan sistem, web app, serta solusi digital kreatif.
          Dengan dukungan ekosistem teknologi dari Mojo Folks, kami mampu menghadirkan pengalaman
          membaca yang lebih nyaman, cepat, dan teroptimasi untuk berbagai perangkat.
        </p>

        <p>
          Melalui sinergi ini, kami memastikan bahwa Folks Daily tidak hanya menjadi media informasi,
          tetapi juga platform digital modern yang terus beradaptasi dengan perkembangan teknologi dan
          kebutuhan pembaca masa kini.
        </p>

        <h2 className="text-xl font-medium mt-6">Misi Kami</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Menyajikan informasi yang akurat, faktual, dan terpercaya.</li>
          <li>Menyediakan pengalaman membaca yang modern dan nyaman.</li>
          <li>Menghadirkan perspektif yang objektif dan bebas kepentingan.</li>
          <li>Mendukung ekosistem digital kreatif bersama Mojo Folks.</li>
        </ul>

        <footer className="mt-8 text-gray-600 text-sm">
          Terima kasih telah menjadi bagian dari perjalanan Kami.  
          <br />— Folks Daily Team
        </footer>
      </section>
    </main>
  );
}
