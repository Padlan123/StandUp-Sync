import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    IconArchive, IconCalendar, IconSearch, IconChevronDown,
    IconChevronRight, IconAlertTriangle, IconCheck,
    IconHash, IconClock, IconDownload, IconX,
} from '@tabler/icons-react';
import DashboardSidebar from '@/Components/DashboardSidebar';

function DayAccordion({ date, messages }) {
    const [open, setOpen] = useState(false);
    const blockers = messages.filter(m => m.content?.toLowerCase().includes('[blocker]'));
    const safes = messages.filter(m => m.content?.toLowerCase().includes('[safe]'));

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    {open ? <IconChevronDown size={16} className="text-slate-400" /> : <IconChevronRight size={16} className="text-slate-400" />}
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <IconCalendar size={15} className="text-slate-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 text-sm">{date}</p>
                        <p className="text-xs text-slate-400">{messages.length} reports</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {blockers.length > 0 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-medium">
                            <IconAlertTriangle size={10} /> {blockers.length} blocker{blockers.length > 1 ? 's' : ''}
                        </span>
                    )}
                    {safes.length > 0 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            <IconCheck size={10} /> {safes.length} safe
                        </span>
                    )}
                </div>
            </button>

            {open && (
                <div className="border-t border-slate-100 divide-y divide-slate-50">
                    {messages.map(msg => {
                        const isBlocker = msg.content?.toLowerCase().includes('[blocker]');
                        return (
                            <div key={msg.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                                <div className="w-7 h-7 rounded-full bg-[#334155] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                    {msg.user?.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <span className="font-medium text-slate-900 text-sm">{msg.user?.name || 'Unknown'}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${isBlocker ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {isBlocker ? 'BLOCKER' : 'SAFE'}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-0.5">
                                            <IconHash size={10} />{msg.channel?.name || 'general'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {msg.content?.replace(/\[(blocker|safe)\]/gi, '').trim()}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                                    <IconClock size={10} />
                                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function DailyReportArchive({ auth, groups, reportsByDate }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const groupList = groups || [];
    const archive = reportsByDate || {};

    const filteredArchive = Object.entries(archive).reduce((acc, [date, messages]) => {
        const filtered = messages.filter(m =>
            m.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.channel?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) acc[date] = filtered;
        return acc;
    }, {});

    const totalReports = Object.values(archive).flat().length;

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="Daily Report Archive – Briefly" />
            <DashboardSidebar auth={auth} groups={groupList} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <IconArchive size={22} className="text-amber-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Daily Report Archive</h1>
                                    <p className="text-slate-500 text-sm mt-0.5">Browse historical stand-up reports by date.</p>
                                </div>
                            </div>
                            <span className="text-sm text-slate-500 shrink-0">{totalReports} total reports</span>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <IconSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by member name, channel, or keyword..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                                    <IconX size={14} />
                                </button>
                            )}
                        </div>

                        {/* Archive List */}
                        {Object.keys(filteredArchive).length === 0 ? (
                            <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <IconArchive size={22} className="text-slate-400" />
                                </div>
                                <h2 className="text-base font-semibold text-slate-700 mb-1">No Reports Found</h2>
                                <p className="text-sm text-slate-400">
                                    {searchQuery ? `No results for "${searchQuery}"` : 'Stand-up reports will appear here once your team starts submitting.'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {Object.entries(filteredArchive)
                                    .sort(([a], [b]) => new Date(b) - new Date(a))
                                    .map(([date, messages]) => (
                                        <DayAccordion key={date} date={date} messages={messages} />
                                    ))
                                }
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
