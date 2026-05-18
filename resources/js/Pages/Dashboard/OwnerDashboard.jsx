import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    IconLayoutSidebarLeftCollapse, 
    IconLayoutSidebarLeftExpand, 
    IconPlus, 
    IconSearch, 
    IconHome, 
    IconRobot, 
    IconUsers, 
    IconRadar, 
    IconArchive, 
    IconSettings, 
    IconMessageCircle, 
    IconDownload,
    IconLogout
} from '@tabler/icons-react';

import DashboardSidebar from '@/Components/DashboardSidebar';

export default function OwnerDashboard({ auth, groups }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'Main Overview', icon: IconHome, href: '#' },
        { name: 'SyncBot Control Center', icon: IconRobot, href: '#' },
        { name: 'Team Management', icon: IconUsers, href: '#' },
        { name: 'Blocker Radar', icon: IconRadar, href: '#' },
        { name: 'Daily Report Archive', icon: IconArchive, href: '#' },
        { name: 'Workspace Settings', icon: IconSettings, href: '#' },
        { name: 'Communication Channels', icon: IconMessageCircle, href: '#' },
    ];

    return (
        <div className="flex h-screen bg-[#FFFFFF] font-sans text-[#0F172A] overflow-hidden">
            <Head title="Owner Dashboard" />

            {/* Sidebar */}
            <DashboardSidebar 
                auth={auth} 
                groups={groups || []} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                {/* Header (Mobile / Optional) */}
                <header className="h-14 border-b border-slate-200 flex items-center px-6 lg:hidden shrink-0">
                    <button onClick={() => setIsCollapsed(false)} className="mr-4">
                        <IconLayoutSidebarLeftExpand size={20} className="text-slate-500" />
                    </button>
                    <span className="font-semibold text-slate-800">Briefly</span>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Main Overview</h1>
                            <p className="mt-2 text-slate-500">Welcome to your Briefly Workspace. Here's a summary of your team's condition today.</p>
                        </div>
                        
                        {/* Placeholder Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                    <IconUsers size={16} /> Total Members
                                </h3>
                                <p className="mt-3 text-3xl font-semibold text-slate-900">12</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Safe Status
                                </h3>
                                <p className="mt-3 text-3xl font-semibold text-emerald-600">10</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div> Blockers
                                </h3>
                                <p className="mt-3 text-3xl font-semibold text-red-500">2</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-8 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-50/30"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-50">
                                    <IconRadar size={28} className="text-[#10B981]" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-900">Blocker Radar is Clear</h2>
                                <p className="mt-2 text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                                    Your team is moving smoothly towards their goals today. No critical blockers have been flagged by the SyncBot.
                                </p>
                                <button className="mt-6 px-4 py-2 bg-[#10B981] hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
                                    View Full Archive
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
