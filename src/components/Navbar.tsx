import React from 'react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between md:justify-center">

                {/* Mobile Menu Icon (Hiasan) */}
                <div className="md:hidden text-gray-400 text-xl cursor-pointer">☰</div>

                {/* Menu Links (Desktop) */}
                <ul className="hidden md:flex items-center gap-8 text-xs font-light text-gray-300 tracking-wide">
                    <li className="hover:text-white cursor-pointer transition-colors"></li>
                    <li className="hover:text-white cursor-pointer transition-colors">Store</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Mac</li>
                    <li className="hover:text-white cursor-pointer transition-colors">iPad</li>
                    <li className="hover:text-white cursor-pointer transition-colors text-white font-medium">iPhone</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Watch</li>
                    <li className="hover:text-white cursor-pointer transition-colors">AirPods</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Support</li>
                </ul>

                {/* Action Icons */}
                <div className="flex gap-4 text-gray-400 md:absolute md:right-6">
                    <span className="hover:text-white cursor-pointer">🔍</span>
                    <span className="hover:text-white cursor-pointer">👜</span>
                </div>
            </div>
        </nav>
    );
}
