/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';

// PASTIKAN FRAME COUNT SESUAI (192)
const FRAME_COUNT = 192;

export default function SequenceScroll() {
    const [currentImg, setCurrentImg] = useState(`/sequence/ezgif-frame-001.jpg`);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- 1. LOGIKA PUTARAN HP (KUNCI POSISI DEPAN) ---
    // Animasi selesai di 90% scroll. Sisa 10% diam menghadap depan.
    const currentIndex = useTransform(scrollYProgress, [0, 0.9], [1, FRAME_COUNT]);

    // --- 2. ANIMASI POP-UP TEKS ---
    const t1Op = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const t1Scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

    const t2Op = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const t2Y = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

    const t3Op = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.80], [0, 1, 1, 0]);
    const t3Y = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.80], [50, 0, 0, -50]);

    const t4Op = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const t4Scale = useTransform(scrollYProgress, [0.85, 0.95], [0.8, 1]);

    // --- 3. EVENT SCROLL ---
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const safeIndex = Math.max(1, Math.min(Math.floor(latest), FRAME_COUNT));
        setCurrentImg(`/sequence/ezgif-frame-${safeIndex.toString().padStart(3, '0')}.jpg`);
    });

    // --- 4. PRELOADER ---
    useEffect(() => {
        const preloadImages = async () => {
            let count = 0;
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const src = `/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
                const promise = new Promise<void>((resolve) => {
                    img.src = src;
                    img.onload = () => {
                        count++;
                        setLoadProgress(Math.round((count / FRAME_COUNT) * 100));
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setIsLoaded(true);
        };

        preloadImages();
    }, []);

    return (
        <div ref={containerRef} className="h-[500vh] bg-black relative">

            {/* A. LOADING SCREEN */}
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-mono text-lg animate-pulse">Loading Experience... {loadProgress}%</p>
                </div>
            )}

            {/* B. STICKY AREA */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* GLOW EFFECT */}
                <div className="absolute w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

                {/* C. GAMBAR SEQUENCE */}
                <img
                    src={currentImg}
                    alt="iPhone Sequence"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* D. "LAKBAN" PENUTUP LOGO VEO (Baru!) */}
                {/* Kotak hitam kecil di pojok kanan bawah untuk menutupi watermark */}
                <div className="absolute bottom-0 right-0 w-24 h-12 bg-black z-20" />

                {/* E. POP-UP TEXT OVERLAYS */}
                <div className="relative z-10 w-full max-w-7xl px-6 h-full pointer-events-none flex flex-col justify-center">

                    {/* Judul */}
                    <motion.div style={{ opacity: t1Op, scale: t1Scale }} className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl">iPhone 13</h1>
                            <p className="text-2xl text-gray-300 mt-4">Your new superpower.</p>
                        </div>
                    </motion.div>

                    {/* Fitur Kiri */}
                    <motion.div style={{ opacity: t2Op, y: t2Y }} className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 max-w-md p-6 bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10">
                        <h2 className="text-4xl font-bold text-blue-400 mb-2">Super Retina XDR</h2>
                        <p className="text-white text-lg">Layar OLED yang lebih terang, lebih tajam, dan hemat daya.</p>
                    </motion.div>

                    {/* Fitur Kanan */}
                    <motion.div style={{ opacity: t3Op, y: t3Y }} className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 max-w-md p-6 bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 text-right">
                        <h2 className="text-4xl font-bold text-purple-400 mb-2">A15 Bionic</h2>
                        <p className="text-white text-lg">Chip smartphone paling ngebut di dunia.</p>
                    </motion.div>

                    {/* Tombol Bawah */}
                    <motion.div style={{ opacity: t4Op, scale: t4Scale }} className="absolute bottom-24 left-0 right-0 flex justify-center pointer-events-auto">
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">Cinematic Mode.</h2>
                            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                                Lihat Spesifikasi Lengkap ↓
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}