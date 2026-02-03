/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring, motion } from 'framer-motion';

const FRAME_COUNT = 192;

export default function SequenceScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    const currentIndex = useTransform(smoothProgress, [0, 0.9], [1, FRAME_COUNT]);

    // 1. PRELOAD SEMUA GAMBAR KE MEMORI
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
                    img.onload = () => {
                        setLoadProgress(prev => Math.min(prev + (100 / FRAME_COUNT), 100)); // Update progress
                        resolve();
                    };
                    img.onerror = () => resolve();
                    loadedImages[i - 1] = img; // Simpan di array sesuai urutan
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // 2. FUNGSI GAMBAR KE CANVAS
    const renderCanvas = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index - 1];

        if (!canvas || !ctx || !img) return;

        // Logika Object-Fit: Cover untuk Canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // 3. JALANKAN RENDER SAAT SCROLL
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!isLoaded) return;
        const safeIndex = Math.max(1, Math.min(Math.floor(latest), FRAME_COUNT));
        requestAnimationFrame(() => renderCanvas(safeIndex));
    });

    // 4. HANDLE RESIZE LAYAR
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Render ulang frame terakhir agar tidak hilang saat resize
                const currentVal = currentIndex.get();
                const safeIndex = Math.max(1, Math.min(Math.floor(currentVal), FRAME_COUNT));
                if (isLoaded) renderCanvas(safeIndex);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images]);

    // --- ANIMASI TEKS (VERSI RINGAN/OPTIMIZED) ---
    const t1Op = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const t1Scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

    const t2Op = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const t2Y = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

    const t3Op = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.80], [0, 1, 1, 0]);
    const t3Y = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.80], [50, 0, 0, -50]);

    const t4Op = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const t4Scale = useTransform(scrollYProgress, [0.85, 0.95], [0.8, 1]);

    return (
        <div ref={containerRef} className="h-[500vh] bg-black relative">

            {/* Loading Screen */}
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-mono text-lg animate-pulse">Loading Canvas Mode... {Math.round(loadProgress)}%</p>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 🔥 INI DIA: CANVAS UTAMA (Bukan <img> lagi) 🔥 */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="absolute w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-24 h-12 bg-black z-20" />

                <div className="relative z-10 w-full max-w-7xl px-6 h-full pointer-events-none flex flex-col justify-center">

                    <motion.div style={{ opacity: t1Op, scale: t1Scale }} className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl">iPhone 13</h1>
                            <p className="text-2xl text-gray-300 mt-4">Your new superpower.</p>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: t2Op, y: t2Y }} className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 max-w-md p-6 bg-black/80 rounded-3xl border border-white/10 shadow-2xl">
                        <h2 className="text-4xl font-bold text-blue-400 mb-2">Super Retina XDR</h2>
                        <p className="text-white text-lg">Layar OLED yang lebih terang, lebih tajam, dan hemat daya.</p>
                    </motion.div>

                    <motion.div style={{ opacity: t3Op, y: t3Y }} className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 max-w-md p-6 bg-black/80 rounded-3xl border border-white/10 text-right shadow-2xl">
                        <h2 className="text-4xl font-bold text-purple-400 mb-2">A15 Bionic</h2>
                        <p className="text-white text-lg">Chip smartphone paling ngebut di dunia.</p>
                    </motion.div>

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