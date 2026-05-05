import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Local SVG Icons (Replacing missing Tabler Icons) ───────────
const SvgRobot = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
const SvgMessage = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const SvgDashboard = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const SvgBuilding = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);
const SvgClock = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const SvgRocket = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);
const SvgWechat = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 15a2 2 0 0 1-2 2H6l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const SvgFolder = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
);
const SvgFolderOpen = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M2 10h20"/></svg>
);
const SvgLock = ({ size = 12, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const SvgCheck = ({ size = 12, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);

// ─── Corner Squares ───────────────────────────────────────────────────────────
const GridSquare = ({ position }) => (
    <div className={`absolute w-2 h-2 bg-white border border-slate-300 z-20 ${position}`} />
);

// ─── Animated Visual: SyncBot Chat ───────────────────────────────────────────
function SyncBotVisual() {
    const messages = [
        { from: 'bot', text: 'Good morning! What did you accomplish yesterday?' },
        { from: 'user', text: 'Fixed auth bug, working on dashboard UI.' },
        { from: 'bot', text: 'Got it! Any blockers today?' },
        { from: 'user', text: 'None, all good!' },
    ];
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        let timeout;
        if (visibleCount < messages.length) {
            timeout = setTimeout(() => {
                setVisibleCount(prev => prev + 1);
            }, 1200);
        } else {
            timeout = setTimeout(() => {
                setVisibleCount(0);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [visibleCount, messages.length]);

    const visibleMessages = messages.slice(0, visibleCount);

    return (
        <div className="mt-8 space-y-3 h-[180px]">
            <AnimatePresence>
                {visibleMessages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.35 }}
                        className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.from === 'bot' ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            {msg.from === 'bot'
                                ? <SvgRobot size={14} className="text-white" />
                                : <span className="text-[10px] font-bold text-slate-600">U</span>}
                        </div>
                        <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.from === 'bot' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-slate-100 text-slate-700'}`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// ─── Animated Visual: Smart Summaries ────────────────────────────────────────
function SmartSummaryVisual() {
    const items = [
        { name: 'Sarah J.', status: 'Safe', color: 'emerald' },
        { name: 'Mike R.', status: 'Blocker', color: 'red' },
        { name: 'Alex K.', status: 'Safe', color: 'emerald' },
    ];
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % items.length), 1800);
        return () => clearInterval(t);
    }, []);

    const colorMap = {
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-400' },
        red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-400' },
    };

    return (
        <div className="mt-6 space-y-2.5 h-[160px]">
            {items.map((item, i) => {
                const c = colorMap[item.color];
                return (
                    <motion.div
                        key={item.name}
                        animate={{ scale: active === i ? 1.02 : 1, opacity: active === i ? 1 : 0.65 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${c.border} ${c.bg}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${c.dot} ${item.status === 'Blocker' ? 'animate-pulse' : ''}`} />
                        <span className="text-xs font-semibold text-slate-700 flex-1">{item.name}</span>
                        <span className={`text-[10px] font-black tracking-widest uppercase ${c.text}`}>{item.status}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ─── Animated Visual: Organized Workspaces ────────────────────────────────────
function WorkspaceVisual() {
    const workspaces = [
        { name: 'Acme Corp', members: 12, open: true },
        { name: 'StartupXYZ', members: 5, open: false },
        { name: 'Design Team', members: 3, open: false },
    ];
    const [openIdx, setOpenIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setOpenIdx(p => (p + 1) % workspaces.length), 2000);
        return () => clearInterval(t);
    }, []);

    const colors = ['purple', 'blue', 'pink'];
    const colorMap = {
        purple: 'text-purple-500 bg-purple-50 border-purple-200',
        blue: 'text-blue-500 bg-blue-50 border-blue-200',
        pink: 'text-pink-500 bg-pink-50 border-pink-200',
    };

    return (
        <div className="mt-6 space-y-2 h-[160px]">
            {workspaces.map((ws, i) => (
                <motion.div
                    key={ws.name}
                    animate={{ x: openIdx === i ? 4 : 0, opacity: openIdx === i ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${openIdx === i ? colorMap[colors[i]] : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                    <div className="shrink-0">{openIdx === i ? <SvgFolderOpen size={16} /> : <SvgFolder size={16} />}</div>
                    <span className="text-xs font-semibold flex-1">{ws.name}</span>
                    <span className="text-[10px] text-slate-400">{ws.members} members</span>
                    <div className="text-slate-300 shrink-0"><SvgLock size={12} /></div>
                </motion.div>
            ))}
            <div className="flex items-center gap-1.5 mt-3 px-1">
                <div className="text-emerald-500 shrink-0"><SvgCheck size={12} strokeWidth="3" /></div>
                <span className="text-[10px] text-slate-400">Each workspace fully isolated & private</span>
            </div>
        </div>
    );
}

// ─── Animated Visual: Fewer Meetings ─────────────────────────────────────────
function FewerMeetingsVisual() {
    const [saved, setSaved] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setSaved(p => (p >= 120 ? 0 : p + 3)), 80);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="mt-6 h-[140px]">
            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                    <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="#fee2e2" strokeWidth="6" />
                        <motion.circle
                            cx="28" cy="28" r="22" fill="none" stroke="#f87171" strokeWidth="6"
                            strokeDasharray={`${2 * Math.PI * 22}`}
                            strokeDashoffset={`${2 * Math.PI * 22 * (1 - saved / 120)}`}
                            strokeLinecap="round"
                            transition={{ duration: 0.1 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black text-rose-500">{saved}m</span>
                    </div>
                </div>
                <div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Time saved</div>
                    <div className="text-slate-700 text-xs mt-0.5">No more 30-min standups</div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex-1 bg-red-50 border border-red-100 rounded-lg px-2 py-1.5 text-center">
                    <div className="text-[10px] text-red-400 font-bold uppercase">Before</div>
                    <div className="text-sm font-black text-red-500 line-through">30 min/day</div>
                </div>
                <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-center">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase">After</div>
                    <div className="text-sm font-black text-emerald-600">&lt; 2 min/day</div>
                </div>
            </div>
        </div>
    );
}

// ─── Animated Visual: Ready in Minutes ───────────────────────────────────────
function ReadyInMinutesVisual() {
    const steps = ['Create workspace', 'Invite your team', 'Set schedule', 'Start syncing!'];
    const [done, setDone] = useState(0);

    useEffect(() => {
        if (done < steps.length) {
            const t = setTimeout(() => setDone(p => p + 1), 900);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => setDone(0), 1500);
            return () => clearTimeout(t);
        }
    }, [done]);

    return (
        <div className="mt-6 space-y-2 h-[140px]">
            {steps.map((step, i) => (
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: i < done ? 1 : 0.35, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${i < done ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}`}>
                        {i < done && <span className="text-white text-[10px] font-black">✓</span>}
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-300 ${i < done ? 'text-slate-700 line-through decoration-emerald-400' : 'text-slate-400'}`}>
                        {step}
                    </span>
                </motion.div>
            ))}
            <div className="mt-3 flex items-center gap-1.5">
                <SvgRocket size={12} className="text-indigo-400" />
                <span className="text-[10px] text-slate-400">Setup in under 5 minutes</span>
            </div>
        </div>
    );
}

// ─── Animated Visual: Built-in Chat ──────────────────────────────────────────
function TeamChatVisual() {
    const msgs = [
        { user: 'Alex', text: 'PR review done!', color: 'bg-emerald-400' },
        { user: 'Bot', text: 'Status updated: SAFE', color: 'bg-emerald-500', isBot: true },
        { user: 'Maya', text: 'Pushed hotfix to prod', color: 'bg-blue-400' },
    ];
    const [shown, setShown] = useState(1);

    useEffect(() => {
        const t = setInterval(() => setShown(p => (p >= msgs.length ? 1 : p + 1)), 1500);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="mt-6 space-y-2.5 h-[160px]">
            {msgs.slice(0, shown).map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                >
                    <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-white text-[9px] font-black shrink-0`}>
                        {m.isBot ? <SvgRobot size={12} className="text-white" /> : m.user[0]}
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-1.5">
                        <span className="text-[10px] font-bold text-slate-500 block">{m.user}</span>
                        <span className="text-xs text-slate-700">{m.text}</span>
                    </div>
                </motion.div>
            ))}
            <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="flex items-center gap-1.5 pl-8"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
            </motion.div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BentoFeatures() {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
                    Platform Features
                </span>
                <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Elevate your team syncs<br />with the modern stand-up.
                </h2>
                <p className="mt-6 text-xl text-slate-500">
                    Briefly is packed with intuitive tools designed to make daily reporting effortless, organized, and transparent for everyone on your team.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-slate-200 relative bg-white mx-auto">

                {/* ① Large — Auto SyncBot */}
                <div className="md:col-span-2 bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative group overflow-hidden flex flex-col">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-14 h-14 bg-[#10B981]/10 flex items-center justify-center mb-6 border border-[#10B981]/20">
                        <SvgRobot className="text-[#10B981]" size={28} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your Friendly Sync Assistant</h3>
                    <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                        Briefly automatically pings your team every morning to ask how things are going. Say goodbye to manual follow-ups and forgotten updates.
                    </p>
                    <SyncBotVisual />
                </div>

                {/* ② Medium — Smart Summaries */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative flex flex-col">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                        <SvgMessage className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Smart Summaries</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Just chat naturally! Our system instantly highlights who is on track and who needs help, turning messy chats into clear progress reports.
                    </p>
                    <SmartSummaryVisual />
                </div>

                {/* ③ Medium — Organized Workspaces */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative flex flex-col">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-14 h-14 bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                        <SvgBuilding className="text-purple-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Organized Workspaces</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Easily manage different projects, teams, or entire companies under one roof. Each space is completely private and secure.
                    </p>
                    <WorkspaceVisual />
                </div>

                {/* ④ Large — Team Status at a Glance */}
                <div className="md:col-span-2 bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 overflow-hidden relative flex flex-col md:flex-row items-start gap-8">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />

                    <div className="relative z-10 w-full md:max-w-[240px] shrink-0">
                        <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                            <SvgDashboard className="text-orange-500" size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Team Status at a Glance</h3>
                        <p className="text-slate-500 text-base leading-relaxed">
                            See exactly how everyone is doing instantly. No more scrolling through endless chat groups.
                        </p>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="flex-1 w-full relative min-h-[220px]">
                        {/* Light card */}
                        <motion.div
                            animate={{ rotate: [-3, -1.5], y: [0, -4] }}
                            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 3 }}
                            className="absolute top-0 left-0 w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm opacity-60"
                        >
                            {[1, 2].map(i => (
                                <div key={i} className="h-10 bg-white rounded-xl flex items-center px-3 gap-3 border border-slate-100 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
                                    <div className="h-2 bg-slate-200 rounded flex-1" />
                                </div>
                            ))}
                        </motion.div>
                        {/* Dark card */}
                        <motion.div
                            animate={{ rotate: [1, 0], y: [8, 0], x: [8, 4] }}
                            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 3 }}
                            className="absolute top-8 left-8 w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-5 shadow-2xl"
                        >
                            {[
                                { name: 'Sarah J.', status: 'Safe', color: 'emerald' },
                                { name: 'Mike R.', status: 'Blocker', color: 'red' },
                                { name: 'Alex K.', status: 'Safe', color: 'emerald' },
                            ].map(row => (
                                <div key={row.name} className="h-12 bg-[#1e293b] rounded-xl flex items-center px-3 gap-3 border border-slate-700/50 mb-2">
                                    <div className="w-7 h-7 rounded-full bg-slate-600 shrink-0 overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=475569&color=fff`} alt="" />
                                    </div>
                                    <div className="h-2 bg-slate-600 rounded flex-1" />
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${row.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse'}`}>
                                        {row.status}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ⑤ Small — Fewer Meetings */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                        <SvgClock className="text-rose-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">Fewer Meetings,<br />More Focus</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Replace time-consuming daily meetings with quick check-ins.</p>
                    <FewerMeetingsVisual />
                </div>

                {/* ⑥ Small — Ready in Minutes */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                        <SvgRocket className="text-indigo-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">Ready in<br />Minutes</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Skip the complicated setups. Create your workspace in under 5 minutes.</p>
                    <ReadyInMinutesVisual />
                </div>

                {/* ⑦ Small — Built-in Chat */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    <div className="w-12 h-12 bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-4">
                        <SvgWechat className="text-[#10B981]" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">Built-in<br />Team Chat</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">A familiar, lightning-fast chat experience built right in. Everything happens in real-time.</p>
                    <TeamChatVisual />
                </div>

            </div>
        </div>
    );
}
