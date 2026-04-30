import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="z-10">
                <Link href="/">
                    <img src="/img/logo/logo-main.svg" alt="StandUp-Sync" className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 shadow-2xl overflow-hidden sm:rounded-2xl z-10">
                {children}
            </div>
            
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 z-10">
                © 2026 StandUp-Sync. All rights reserved.
            </div>
        </div>
    );
}
