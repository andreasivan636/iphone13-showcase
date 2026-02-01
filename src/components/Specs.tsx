'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

function AnimatedPrice({ from, to }: { from: number; to: number }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const display = useTransform(rounded, (latest) => "Rp " + latest.toLocaleString("id-ID"));
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) animate(count, to, { duration: 2.5, ease: "circOut" });
    }, [isInView, count, to]);

    return <motion.span ref={ref} className="tabular-nums tracking-tight">{display}</motion.span>;
}

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Specs() {
    return (
        <section className="bg-zinc-950 py-24 px-6 md:px-20 relative z-20 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mb-16 text-center"
                >
                    What makes it Pro.
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >

                    {/* Card 1: Performance (DIPERBAIKI: Font size disesuaikan) */}
                    <motion.div variants={item} whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-zinc-900 rounded-3xl p-8 md:p-10 border border-zinc-800 hover:border-purple-500/50 transition-colors group">
                        <h3 className="text-zinc-400 text-lg md:text-xl font-medium group-hover:text-white transition-colors">Performance</h3>
                        <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-4">A15 Bionic.</p>
                        {/* Ubah text-lg jadi text-base agar tidak terpotong */}
                        <p className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
                            Chip smartphone paling ngebut di dunia saat peluncurannya.
                        </p>
                    </motion.div>

                    {/* Card 2: Connectivity */}
                    <motion.div variants={item} whileHover={{ scale: 1.02 }} className="bg-blue-900/10 rounded-3xl p-8 md:p-10 border border-blue-900/30 hover:bg-blue-900/20 hover:border-blue-500/50 transition-all">
                        <h3 className="text-blue-300 text-lg md:text-xl font-medium">Connectivity</h3>
                        <p className="text-4xl md:text-5xl font-bold text-blue-400 mt-4">5G</p>
                        <p className="text-blue-200 mt-2 text-sm md:text-base">Super fast downloads.</p>
                    </motion.div>

                    {/* Card 3: Camera */}
                    <motion.div variants={item} whileHover={{ scale: 1.02 }} className="bg-zinc-900 rounded-3xl p-8 md:p-10 border border-zinc-800 hover:border-yellow-500/50 transition-colors min-h-[200px]">
                        <h3 className="text-zinc-400 text-lg md:text-xl font-medium">Camera</h3>
                        <p className="text-3xl md:text-4xl font-bold text-white mt-2">Cinematic</p>
                        <p className="text-gray-400 mt-2 text-sm">1080p at 30 fps.</p>
                    </motion.div>

                    {/* Card 4: Battery */}
                    <motion.div variants={item} whileHover={{ scale: 1.02 }} className="bg-zinc-900 rounded-3xl p-8 md:p-10 border border-zinc-800 hover:border-green-500/50 transition-colors min-h-[200px]">
                        <h3 className="text-zinc-400 text-lg md:text-xl font-medium">Battery</h3>
                        <p className="text-3xl md:text-4xl font-bold text-white mt-2">All-day life</p>
                        <p className="text-gray-400 mt-2 text-sm">Up to 19 hours video.</p>
                    </motion.div>

                    {/* Card 5: Price */}
                    <motion.div variants={item} whileHover={{ scale: 1.05 }} className="col-span-1 md:col-span-1 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-zinc-700 flex flex-col justify-center items-center text-center shadow-lg shadow-black/50">
                        <p className="text-gray-400 text-sm mb-2">Mulai dari</p>
                        <div className="h-12 flex items-center justify-center">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white whitespace-nowrap">
                                <AnimatedPrice from={1000000} to={12999000} />
                            </p>
                        </div>
                        <button className="mt-6 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 hover:shadow-lg transition-all active:scale-95 w-full">
                            Beli Sekarang
                        </button>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}