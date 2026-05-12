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

export default function OwnerDashboard({ auth }) {
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
            <aside 
                className={`flex flex-col border-r border-slate-200 bg-[#F9F9F9] transition-all duration-300 ease-in-out shrink-0 ${isCollapsed ? 'w-16' : 'w-64'}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center h-14 px-3 overflow-hidden whitespace-nowrap">
                    {/* Icon Container for Header Toggle to keep it perfectly aligned with other icons */}
                    <div className="w-10 shrink-0 flex items-center justify-center h-full">
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 transition-colors focus:outline-none"
                            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {isCollapsed ? <IconLayoutSidebarLeftExpand size={18} stroke={1.5} /> : <IconLayoutSidebarLeftCollapse size={18} stroke={1.5} />}
                        </button>
                    </div>
                    
                    {/* Brand Logo & Name */}
                    <div className={`flex items-center gap-2 overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 ml-1'}`}>
                        <img src="/img/logo/logo-main.svg" alt="Briefly" className="w-5 h-5 shrink-0" onError={(e) => e.target.style.display = 'none'} />
                        <span className="font-semibold text-sm">Briefly</span>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="px-3 py-2 space-y-1">
                    <button className="flex items-center w-full h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-200 transition-colors overflow-hidden whitespace-nowrap">
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <div className="flex items-center justify-center w-5 h-5 bg-slate-200 rounded-full text-slate-600">
                                <IconPlus size={14} stroke={2} />
                            </div>
                        </div>
                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>New Workspace</span>
                    </button>

                    <button className="flex items-center w-full h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-200 transition-colors overflow-hidden whitespace-nowrap">
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <IconSearch size={18} stroke={1.5} className="text-slate-500" />
                        </div>
                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Search</span>
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                    <nav className="px-3 space-y-0.5">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index}
                                href={item.href}
                                className="flex items-center w-full h-9 text-sm text-slate-700 rounded-md hover:bg-slate-200 transition-colors group overflow-hidden whitespace-nowrap"
                                title={isCollapsed ? item.name : ''}
                            >
                                <div className="w-10 shrink-0 flex items-center justify-center h-full">
                                    <item.icon size={18} stroke={1.5} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
                                </div>
                                <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 pr-3'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className={`px-5 mt-6 mb-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 invisible' : 'opacity-100 visible'}`}>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Channels</h3>
                        <div className="mt-2 space-y-1">
                            <a href="#" className="block px-2 py-1 text-sm text-slate-600 rounded-md hover:bg-slate-200 truncate"># engineering</a>
                            <a href="#" className="block px-2 py-1 text-sm text-slate-600 rounded-md hover:bg-slate-200 truncate"># marketing</a>
                        </div>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-slate-200 space-y-1 overflow-hidden">
                    <button className="flex items-center w-full h-9 text-sm text-slate-700 rounded-md hover:bg-slate-200 transition-colors whitespace-nowrap" title={isCollapsed ? "Download App" : ""}>
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <IconDownload size={18} stroke={1.5} className="text-slate-500" />
                        </div>
                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Download App</span>
                    </button>
                    
                    <div className="flex items-center w-full h-9 mt-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap" title={isCollapsed ? "Profile & Settings" : ""}>
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <div className="w-6 h-6 rounded-full bg-[#334155] text-white flex items-center justify-center text-xs font-bold">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className={`flex-1 min-w-0 flex items-center justify-between transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                            <span className="text-sm font-medium text-slate-900 truncate pr-2">{auth.user.name}</span>
                            <Link href={route('logout')} method="post" as="button" className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors shrink-0 mr-1" title="Logout">
                                <IconLogout size={14} stroke={1.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

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
