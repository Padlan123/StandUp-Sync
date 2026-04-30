import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <img src="/img/logo/logo-main.svg" alt="Logo" className="w-8 h-8" />
                            <span className="ml-3 font-bold text-xl text-gray-900 dark:text-white">StandUp-Sync</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 dark:text-gray-400">Halo, {auth.user.name}</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Keluar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800">
                        <div className="p-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Anda berhasil masuk! Selamat datang di StandUp-Sync.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
