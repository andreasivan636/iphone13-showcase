import Navbar from "../components/Navbar"; // Pastikan path pakai titik dua (..)
import SequenceScroll from "../components/SequenceScroll";
import Specs from "../components/Specs";
import Showcase from "../components/Showcase"; // <-- Import Showcase

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <SequenceScroll />
            <Specs />

            {/* SEKSI BARU: Cinematic Showcase */}
            <Showcase />

            <footer className="py-20 text-center bg-black border-t border-zinc-900">
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                    More Pro than Ever.
                </h2>
                <p className="text-zinc-500 mt-4 text-sm">Designed by Kamu di Surabaya.</p>
            </footer>
        </main>
    );
}