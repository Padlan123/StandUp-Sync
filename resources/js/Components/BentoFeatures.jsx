import React, { useEffect, useState } from 'react';
import {
    IconRobot, IconMessage, IconLayoutDashboard,
    IconBuilding, IconClockOff, IconRocket, IconBrandWechat
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Corner Squares ───────────────────────────────────────────────────────────
const GridSquare = ({ position }) => (
    <div className={`absolute w-2 h-2 bg-white border border-slate-300 z-20 ${position}`} />
);

// ─── Animated Visual: SyncBot Chat ───────────────────────────────────────────
function SyncBotVisual() {
    const messages = [
        { from: 'bot', text: '👋 Good morning! What did you accomplish yesterday?' },
        { from: 'user', text: 'Fixed auth bug, working on dashboard UI.' },
        { from: 'bot', text: '✅ Got it! Any blockers today?' },
        { from: 'user', text: 'None, all good! 🚀' },
    ];
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        let i = 0;
        const add = () => {
            if (i < messages.length) {
                setVisible(prev => [...prev, messages[i]]);
                i++;
                setTimeout(add, 1200);
            } else {
                setTimeout(() => { setVisible([]); i = 0; add(); }, 2000);
            }
        };
        const t = setTimeout(add, 400);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="mt-8 space-y-3 min-h-[140px]">
            <AnimatePresence>
                {visible.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.from === 'bot' ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            {msg.from === 'bot'
                                ? <IconRobot size={14} className="text-white" />
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
        <div className="mt-6 space-y-2.5">
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
        <div className="mt-6 space-y-2">
            {workspaces.map((ws, i) => (
                <motion.div
                    key={ws.name}
                    animate={{ x: openIdx === i ? 4 : 0, opacity: openIdx === i ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${openIdx === i ? colorMap[colors[i]] : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                    <span className="text-sm">{openIdx === i ? '📂' : '📁'}</span>
                    <span className="text-xs font-semibold flex-1">{ws.name}</span>
                    <span className="text-[10px] text-slate-400">{ws.members} members</span>
                    <span className="text-slate-300 text-xs">🔒</span>
                </motion.div>
            ))}
            <div className="flex items-center gap-1.5 mt-3 px-1">
                <span className="text-emerald-500 text-xs">✓</span>
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
        <div className="mt-6">
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
    const steps = ['Create workspace', 'Invite your team', 'Set schedule', 'Start syncing! 🎉'];
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
        <div className="mt-6 space-y-2">
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
                <IconRocket size={12} className="text-indigo-400" />
                <span className="text-[10px] text-slate-400">Setup in under 5 minutes</span>
            </div>
        </div>
    );
}

// ─── Animated Visual: Built-in Chat ──────────────────────────────────────────
function TeamChatVisual() {
    const msgs = [
        { user: 'Alex', text: 'PR review done! 🎉', color: 'bg-emerald-400' },
        { user: 'Bot', text: 'Status updated: SAFE ✅', color: 'bg-emerald-500', isBot: true },
        { user: 'Maya', text: 'Pushed hotfix to prod 🚀', color: 'bg-blue-400' },
    ];
    const [shown, setShown] = useState(1);

    useEffect(() => {
        const t = setInterval(() => setShown(p => (p >= msgs.length ? 1 : p + 1)), 1500);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="mt-6 space-y-2.5 min-h-[120px]">
            {msgs.slice(0, shown).map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                >
                    <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-white text-[9px] font-black shrink-0`}>
                        {m.isBot ? '🤖' : m.user[0]}
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
                        <IconRobot className="text-[#10B981]" size={28} />
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
                        <IconMessage className="text-blue-500" size={28} />
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
                        <IconBuilding className="text-purple-500" size={28} />
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
                            <IconLayoutDashboard className="text-orange-500" size={28} />
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
                        <IconClockOff className="text-rose-500" size={24} />
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
                        <IconRocket className="text-indigo-500" size={24} />
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
                        <IconBrandWechat className="text-[#10B981]" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">Built-in<br />Team Chat</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">A familiar, lightning-fast chat experience built right in. Everything happens in real-time.</p>
                    <TeamChatVisual />
                </div>

            </div>
        </div>
    );
}
