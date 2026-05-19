import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    IconRadar, IconAlertTriangle, IconCheck,
    IconUser, IconHash, IconClock, IconFilter,
    IconShieldCheck, IconRefresh,
} from '@tabler/icons-react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function BlockerRadar({ auth, groups, blockerMessages, safeMessages, stats }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [filter, setFilter] = useState('all');

    const groupList = groups || [];
    const blockers = blockerMessages || [];
    const safes = safeMessages || [];
    const allMessages = filter === 'blocker' ? blockers : filter === 'safe' ? safes : [...blockers, ...safes];
    allMessages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const dashStats = stats || { totalMembers: 0, blockersToday: blockers.length, safeToday: safes.length };

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="Blocker Radar – Briefly" />
            <DashboardSidebar auth={auth} groups={groupList} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                                    <IconRadar size={22} className="text-rose-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Blocker Radar</h1>
                                    <p className="text-slate-500 text-sm mt-0.5">Real-time view of team blockers and progress today.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <IconRefresh size={15} /> Refresh
                            </button>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Members</p>
                                <p className="text-3xl font-bold text-slate-900">{dashStats.totalMembers}</p>
                            </div>
                            <div className="bg-white border border-rose-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <p className="text-xs font-medium text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <IconAlertTriangle size={12} /> Blockers Today
                                </p>
                                <p className="text-3xl font-bold text-rose-600">{dashStats.blockersToday}</p>
                            </div>
                            <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <IconCheck size={12} /> Safe Today
                                </p>
                                <p className="text-3xl font-bold text-emerald-600">{dashStats.safeToday}</p>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 mb-4">
                            <IconFilter size={15} className="text-slate-400" />
                            {['all', 'blocker', 'safe'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors capitalize ${
                                        filter === f
                                            ? f === 'blocker' ? 'bg-rose-100 text-rose-700' : f === 'safe' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {f === 'all' ? 'All' : f === 'blocker' ? `🔴 Blockers (${blockers.length})` : `🟢 Safe (${safes.length})`}
                                </button>
                            ))}
                        </div>

                        {/* Messages Feed */}
                        {allMessages.length === 0 ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-50">
                                    <IconShieldCheck size={26} className="text-emerald-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-slate-900 mb-1">Radar is Clear!</h2>
                                <p className="text-slate-500 text-sm">No blockers reported today. Your team is running smoothly.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {allMessages.map(msg => {
                                    const isBlocker = msg.content?.toLowerCase().includes('[blocker]');
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`bg-white border rounded-xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 ${
                                                isBlocker ? 'border-rose-200' : 'border-emerald-200'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                        {msg.user?.name?.charAt(0).toUpperCase() || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <span className="font-semibold text-slate-900 text-sm">{msg.user?.name || 'Unknown'}</span>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${isBlocker ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                                {isBlocker ? <><IconAlertTriangle size={10} /> BLOCKER</> : <><IconCheck size={10} /> SAFE</>}
                                                            </span>
                                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                                <IconHash size={11} /> {msg.channel?.name || 'general'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-700 leading-relaxed">
                                                            {msg.content?.replace(/\[(blocker|safe)\]/gi, '').trim()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                                                    <IconClock size={11} />
                                                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
