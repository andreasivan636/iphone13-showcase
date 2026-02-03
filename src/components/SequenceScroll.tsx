/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const FRAME_COUNT = 192;

export default function SequenceScroll() {
    const imgRef = useRef<HTMLImageElement>(null);
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

    // Update Gambar Langsung ke DOM (Tanpa React Render)
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const safeIndex = Math.max(1, Math.min(Math.floor(latest), FRAME_COUNT));
        const newSrc = `/sequence/ezgif-frame-${safeIndex.toString().padStart(3, '0')}.jpg`;
        if (imgRef.current) {
            imgRef.current.src = newSrc;
        }
    });

    // Preloader
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

            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <p className="text-white font-mono animate-pulse">Loading Test Mode... {loadProgress}%</p>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* GAMBAR SAJA - TANPA ELEMEN LAIN */}
                <img
                    ref={imgRef}
                    src="/sequence/ezgif-frame-001.jpg"
                    alt="Sequence Test"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ willChange: "contents" }}
                />

                {/* Indikator Debugging Kecil di Pojok Kiri Atas */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs z-50">
                    TEST MODE: NO TEXT
                </div>

            </div>
        </div>
    );
}