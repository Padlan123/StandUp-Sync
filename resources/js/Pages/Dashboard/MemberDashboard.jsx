import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function MemberDashboard({ auth, groups }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#FFFFFF] font-sans text-[#0F172A] overflow-hidden">
            <Head title="Member Dashboard" />

            {/* Sidebar */}
            <DashboardSidebar 
                auth={auth} 
                groups={groups || []} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                <header className="h-14 border-b border-slate-200 flex items-center px-6 lg:hidden shrink-0">
                    <button onClick={() => setIsCollapsed(false)} className="mr-4">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <span className="font-semibold text-slate-800">Briefly</span>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Dashboard Member</h1>
                            <p className="mt-2 text-slate-500">Anda berhasil masuk sebagai Member! Selamat datang di StandUp-Sync. Di sini Anda bisa melaporkan progres harian Anda.</p>
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-50/30"></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold text-slate-900">Mulai Kolaborasi</h2>
                                <p className="mt-2 text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                                    Silakan cek channel komunikasi di sidebar sebelah kiri untuk melihat pesan tim dan melaporkan progres harian Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
