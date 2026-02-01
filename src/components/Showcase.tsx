'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Showcase() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Efek Parallax & Scale
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <section ref={ref} className="bg-black py-32 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

                {/* Teks Judul */}
                <motion.div style={{ opacity, y }}>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Cinematic mode.
                    </h2>
                    <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-16">
                        Otomatis menciptakan efek kedalaman dan transisi fokus yang indah dalam video Anda.
                    </p>
                </motion.div>

                {/* Kotak Video (Placeholder) */}
                <motion.div
                    style={{ scale }}
                    className="relative w-full aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group cursor-pointer"
                >
                    {/* Simulasi Tampilan Kamera */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 text-left">
                        <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-1">Rack Focus</p>
                        <p className="text-white text-xl font-medium">Shot on iPhone 13</p>
                    </div>

                    {/* Gambar Placeholder (Bisa diganti video asli nanti) */}
                    <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-gray-800 opacity-50"></div>
                </motion.div>

            </div>
        </section>
    );
}
