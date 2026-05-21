import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import {
    IconHash,
    IconSend,
    IconRobot,
    IconUsers,
    IconHome,
    IconSettings,
    IconLogout,
    IconChevronDown,
    IconPlus,
    IconCircleFilled,
    IconCheck,
    IconAlertTriangle,
    IconMessage,
    IconAt,
    IconBell,
} from '@tabler/icons-react';

import DashboardSidebar from '@/Components/DashboardSidebar';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Hari ini';
    if (d.toDateString() === yesterday.toDateString()) return 'Kemarin';
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
}

function groupMessagesByDate(messages) {
    const groups = {};
    messages.forEach(msg => {
        const key = new Date(msg.created_at).toDateString();
        if (!groups[key]) groups[key] = { label: formatDate(msg.created_at), messages: [] };
        groups[key].messages.push(msg);
    });
    return Object.values(groups);
}

function avatarColor(name) {
    const colors = [
        'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
        'bg-rose-500', 'bg-amber-500', 'bg-cyan-500', 'bg-pink-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

// Helper untuk parsing Markdown sederhana dari response Bot
function parseItalic(text) {
    if (!text) return '';
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="italic">{part.substring(1, part.length - 1)}</em>;
        }
        return part;
    });
}

function parseInlineMarkdown(text) {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.substring(2, part.length - 2);
            return <strong key={i} className="font-semibold text-slate-900">{parseItalic(boldText)}</strong>;
        }
        return <span key={i}>{parseItalic(part)}</span>;
    });
}

function renderMarkdown(text) {
    if (!text) return null;
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-sm font-bold text-slate-900 mt-3 mb-1 first:mt-0">{parseInlineMarkdown(line.substring(4))}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-base font-bold text-slate-900 mt-4 mb-1 first:mt-0">{parseInlineMarkdown(line.substring(3))}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-lg font-bold text-slate-900 mt-4 mb-2 first:mt-0">{parseInlineMarkdown(line.substring(2))}</h1>;
        }
        
        // List items (e.g. * atau - atau 1.)
        const listMatch = line.match(/^([*\-]\s|\d+\.\s)(.*)/);
        if (listMatch) {
            const content = listMatch[2];
            return (
                <div key={index} className="flex items-start gap-2 ml-1.5 my-1">
                    <span className="text-emerald-500 font-bold shrink-0 select-none">•</span>
                    <span className="flex-1 text-slate-700">{parseInlineMarkdown(content)}</span>
                </div>
            );
        }
        
        // Baris kosong
        if (line.trim() === '') {
            return <div key={index} className="h-2" />;
        }
        
        // Paragraf biasa
        return <p key={index} className="my-1 text-slate-700 leading-relaxed">{parseInlineMarkdown(line)}</p>;
    });
}

// ─── Bot Message Renderer ─────────────────────────────────────────────────────
function BotMessage({ content }) {
    const isReminder = content.includes('Apa progresmu') || content.includes('SyncBot');
    return (
        <div className="flex items-start gap-3 px-4 py-2 group hover:bg-slate-50/80 rounded-lg mx-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                <IconRobot size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-semibold text-emerald-600">SyncBot</span>
                    <span className="text-[11px] text-slate-400">{formatTime(new Date().toISOString())}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">BOT</span>
                </div>
                <div className={`text-sm leading-relaxed rounded-2xl px-4 py-3.5 inline-block max-w-2xl border shadow-sm ${
                    isReminder
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-slate-700'
                        : 'bg-white border-slate-200 text-slate-700'
                }`}
                style={{ fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    {renderMarkdown(content)}
                </div>
            </div>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, onClick }) {
    const config = {
        safe: { label: 'Safe', icon: IconCheck, cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        blocker: { label: 'Blocker', icon: IconAlertTriangle, cls: 'bg-red-100 text-red-700 border-red-200' },
    };
    const item = config[status];
    if (!item) return null;
    const Icon = item.icon;
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.cls}`}>
            <Icon size={10} />
            {item.label}
        </span>
    );
}

// ─── Single Message ───────────────────────────────────────────────────────────
function ChatMessage({ message, isOwn, showAvatar, prevSameUser }) {
    const name = message.user?.name ?? 'Unknown';
    const content = message.content ?? '';
    const isBot = message.user_id === null || message.user?.name === 'SyncBot';

    if (isBot) return <BotMessage content={content} />;

    const hasBlocker = content.toLowerCase().includes('[blocker]');
    const hasSafe = content.toLowerCase().includes('[safe]');
    const cleanContent = content.replace(/\[(blocker|safe)\]/gi, '').trim();

    return (
        <div className={`flex items-start gap-3 px-4 py-1 group hover:bg-slate-50/60 rounded-lg mx-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-9 h-9 shrink-0 ${!showAvatar && !isOwn ? 'invisible' : ''}`}>
                {showAvatar && (
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm ${avatarColor(name)}`}>
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                {showAvatar && (
                    <div className={`flex items-baseline gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-semibold text-slate-800">{name}</span>
                        <span className="text-[11px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{formatTime(message.created_at)}</span>
                    </div>
                )}
                <div className={`relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    isOwn
                        ? 'bg-[#10B981] text-white rounded-tr-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                }`}
                style={{ fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    {cleanContent}
                    {hasBlocker && <div className="mt-1.5"><StatusBadge status="blocker" /></div>}
                    {hasSafe && <div className="mt-1.5"><StatusBadge status="safe" /></div>}
                </div>
                {!showAvatar && (
                    <span className="text-[10px] text-slate-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity px-1">
                        {formatTime(message.created_at)}
                    </span>
                )}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatRoom({ auth, group, channel, messages: initialMessages, groups }) {
    const [messages, setMessages] = useState(initialMessages ?? []);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [botLoading, setBotLoading] = useState(false);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showStatusPicker, setShowStatusPicker] = useState(false);
    const [showBotMenu, setShowBotMenu] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const botMenuRef = useRef(null);

    // Auto-scroll ke bawah saat ada pesan baru atau bot mengetik
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    // Safety timeout agar typing indicator bot tidak menggantung selamanya
    useEffect(() => {
        if (!isBotTyping) return;

        const timer = setTimeout(() => {
            setIsBotTyping(false);
        }, 30000); // 30 detik safety timeout

        return () => clearTimeout(timer);
    }, [isBotTyping]);

    // Tutup menu bot ketika klik di luar menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (botMenuRef.current && !botMenuRef.current.contains(e.target)) {
                setShowBotMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Setup Laravel Echo — listen ke PresenceChannel
    useEffect(() => {
        if (!window.Echo) return;

        const channelSub = window.Echo.join(`chat.${channel.id}`)
            .here(users => setOnlineUsers(users))
            .joining(user => setOnlineUsers(prev => [...prev, user]))
            .leaving(user => setOnlineUsers(prev => prev.filter(u => u.id !== user.id)))
            .listen('MessageSent', e => {
                // Matikan typing indicator jika pesan dari bot
                if (e.message.user_id === null || e.message.user?.name === 'SyncBot') {
                    setIsBotTyping(false);
                }

                setMessages(prev => {
                    // Cek jika pesan sudah ada
                    if (prev.some(m => m.id === e.message.id)) return prev;
                    return [...prev, e.message];
                });
            });

        return () => {
            window.Echo.leave(`chat.${channel.id}`);
        };
    }, [channel.id]);

    // Trigger SyncBot standup reminder
    const triggerStandup = async () => {
        if (botLoading) return;
        setBotLoading(true);
        setIsBotTyping(true);
        setShowBotMenu(false);
        try {
            await axios.post(route('bot.trigger-standup', channel.id));
        } catch (err) {
            console.error('Bot trigger failed:', err);
            setIsBotTyping(false);
        } finally {
            setBotLoading(false);
        }
    };

    // Kirim prompt aksi cepat seolah-olah diketik oleh pengguna
    const sendQuickAction = async (text) => {
        if (!text || sending) return;
        
        setShowBotMenu(false);
        setSending(true);

        const optimistic = {
            id: `tmp-${Date.now()}`,
            content: text,
            user_id: auth.user.id,
            user: auth.user,
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimistic]);

        try {
            const res = await axios.post(route('send.message', channel.id), { message: text });
            setMessages(prev => prev.map(m => m.id === optimistic.id ? res.data.message : m));
            if (res.data.bot_processing) {
                setIsBotTyping(true);
            }
        } catch (err) {
            setMessages(prev => prev.filter(m => m.id !== optimistic.id));
        } finally {
            setSending(false);
            inputRef.current?.focus();
        }
    };

    // Kirim pesan via Axios (JSON)
    const sendMessage = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || sending) return;

        setSending(true);
        setInput('');

        // Optimistic update
        const optimistic = {
            id: `tmp-${Date.now()}`,
            content: text,
            user_id: auth.user.id,
            user: auth.user,
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimistic]);

        try {
            const res = await axios.post(route('send.message', channel.id), { message: text });
            // Ganti optimistic dengan data dari server
            setMessages(prev => prev.map(m => m.id === optimistic.id ? res.data.message : m));
            
            // Aktifkan bot typing indicator jika request butuh processing AI
            if (res.data.bot_processing) {
                setIsBotTyping(true);
            }
        } catch (err) {
            // Hapus optimistic jika gagal
            setMessages(prev => prev.filter(m => m.id !== optimistic.id));
            setInput(text); // kembalikan input
        } finally {
            setSending(false);
            inputRef.current?.focus();
        }
    };

    // Quick status append
    const appendStatus = (status) => {
        setInput(prev => `${prev} [${status.toUpperCase()}]`.trim());
        setShowStatusPicker(false);
        inputRef.current?.focus();
    };

    const grouped = groupMessagesByDate(messages);

    return (
        <div className="flex h-screen bg-[#F1F5F4] font-sans text-[#0F172A] overflow-hidden">
            <Head title={`#${channel.name} — Briefly`} />

            {/* ── LEFT SIDEBAR ── */}
            <DashboardSidebar 
                auth={auth} 
                groups={groups || []} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
                currentChannelId={channel.id}
            />

            {/* ── MAIN AREA ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Channel Header */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 shadow-sm">
                    <button onClick={() => setIsCollapsed(s => !s)} className="text-slate-500 hover:text-slate-800 transition-colors md:hidden">
                        <IconHash size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
                                {group.name}
                            </span>
                            <h1 className="font-semibold text-slate-800 text-base truncate"># {channel.name}</h1>
                        </div>
                        {channel.description && (
                            <p className="text-xs text-slate-500 truncate mt-0.5">{channel.description}</p>
                        )}
                    </div>

                    {/* Online users */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                            {onlineUsers.slice(0, 4).map(u => (
                                <div key={u.id} title={u.name}
                                    className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${avatarColor(u.name)}`}>
                                    {u.name.charAt(0).toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <IconCircleFilled size={8} className="text-emerald-500" />
                            <span>{onlineUsers.length} online</span>
                        </div>
                    </div>
                    <IconUsers size={18} className="text-slate-400" />
                    <IconSettings size={18} className="text-slate-400 cursor-pointer hover:text-slate-700 transition-colors" />
                    
                    {/* Bot Trigger Button with Dropdown */}
                    <div className="relative" ref={botMenuRef}>
                        <button
                            onClick={() => setShowBotMenu(!showBotMenu)}
                            disabled={botLoading}
                            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors border border-indigo-200 disabled:opacity-50 text-xs font-semibold shadow-sm"
                            title="Tindakan Cepat SyncBot"
                        >
                            {botLoading ? (
                                <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <IconRobot size={16} />
                            )}
                            <span className="hidden sm:inline">SyncBot</span>
                            <IconChevronDown size={14} className={`transition-transform ${showBotMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showBotMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-3 pb-2 mb-2 border-b border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aksi Pintar AI</p>
                                </div>
                                
                                <button 
                                    onClick={triggerStandup}
                                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-indigo-50 text-sm text-slate-700 transition-colors"
                                >
                                    <IconMessage size={16} className="text-indigo-500" />
                                    <span>Pengingat Stand-up</span>
                                </button>
                                
                                <button 
                                    onClick={() => sendQuickAction('@SyncBot Tolong berikan ringkasan eksekutif (executive summary) dari laporan stand-up tim hari ini.')}
                                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-emerald-50 text-sm text-slate-700 transition-colors"
                                >
                                    <IconRobot size={16} className="text-emerald-500" />
                                    <span>Buat Rangkuman Harian</span>
                                </button>
                                
                                <button 
                                    onClick={() => sendQuickAction('@SyncBot Tolong analisis semua obrolan dan buat daftar siapa saja yang sedang mengalami blocker/hambatan hari ini.')}
                                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-rose-50 text-sm text-slate-700 transition-colors"
                                >
                                    <IconAlertTriangle size={16} className="text-rose-500" />
                                    <span>Deteksi Blocker Tim</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-1 scroll-smooth">
                    {grouped.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-slate-400">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                                <IconMessage size={32} className="text-slate-300" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">Belum ada pesan di sini.</p>
                            <p className="text-xs text-slate-400">Mulai percakapan dengan timmu!</p>
                        </div>
                    )}

                    {grouped.map((dateGroup, di) => (
                        <div key={di}>
                            {/* Date divider */}
                            <div className="flex items-center gap-3 px-4 my-4">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-xs font-semibold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                    {dateGroup.label}
                                </span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            {/* Messages */}
                            {dateGroup.messages.map((msg, mi) => {
                                const prev = dateGroup.messages[mi - 1];
                                const showAvatar = !prev || prev.user_id !== msg.user_id
                                    || (new Date(msg.created_at) - new Date(prev.created_at)) > 5 * 60 * 1000;
                                return (
                                    <ChatMessage
                                        key={msg.id}
                                        message={msg}
                                        isOwn={msg.user_id === auth.user.id}
                                        showAvatar={showAvatar}
                                    />
                                );
                            })}
                        </div>
                    ))}

                    {isBotTyping && (
                        <div className="flex items-start gap-3 px-4 py-2 mx-2 animate-in fade-in duration-300">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                                <IconRobot size={18} className="text-white animate-pulse" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-sm font-semibold text-emerald-600">SyncBot</span>
                                    <span className="text-[11px] text-slate-400">sedang mengetik...</span>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">BOT</span>
                                </div>
                                <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 w-fit shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* ── INPUT AREA ── */}
                <div className="px-4 pb-4 pt-2 bg-[#F1F5F4] shrink-0">
                    <form onSubmit={sendMessage}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-50 transition-all">

                        {/* Status picker row */}
                        {showStatusPicker && (
                            <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-b border-slate-100">
                                <span className="text-xs text-slate-500 font-medium">Tandai status:</span>
                                <button type="button" onClick={() => appendStatus('safe')}
                                    className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors">
                                    <IconCheck size={11} /> Safe
                                </button>
                                <button type="button" onClick={() => appendStatus('blocker')}
                                    className="flex items-center gap-1 text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                                    <IconAlertTriangle size={11} /> Blocker
                                </button>
                            </div>
                        )}

                        <div className="flex items-end gap-2 p-2 pl-4">
                            {/* Status toggle button */}
                            <button
                                type="button"
                                onClick={() => setShowStatusPicker(s => !s)}
                                title="Tandai status laporan"
                                className={`mb-1.5 p-1.5 rounded-lg transition-colors ${showStatusPicker ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                            >
                                <IconCircleFilled size={16} />
                            </button>

                            <textarea
                                ref={inputRef}
                                value={input}
                                maxLength={2000}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage(e);
                                    }
                                }}
                                placeholder={`Kirim pesan ke #${channel.name}... (Enter untuk kirim, Shift+Enter untuk baris baru)`}
                                rows={1}
                                className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none py-2 max-h-40 leading-relaxed"
                                style={{ fieldSizing: 'content' }}
                            />

                            <button
                                type="submit"
                                disabled={!input.trim() || sending}
                                className="mb-1 w-9 h-9 flex items-center justify-center bg-[#10B981] hover:bg-emerald-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm active:scale-95"
                            >
                                <IconSend size={16} stroke={2} />
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-between items-center mt-2 px-1">
                        <p className="text-[11px] text-slate-400">
                            Gunakan <kbd className="bg-slate-100 border border-slate-200 rounded px-1 text-slate-500 font-mono text-[10px]">Shift+Enter</kbd> untuk baris baru
                        </p>
                        <p className={`text-[10px] font-medium ${input.length >= 2000 ? 'text-red-500' : input.length > 1800 ? 'text-amber-500' : 'text-slate-400'}`}>
                            {input.length} / 2000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
