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
                <div className={`text-sm leading-relaxed rounded-xl px-4 py-3 inline-block max-w-md ${
                    isReminder
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-slate-700'
                        : 'bg-slate-100 text-slate-700'
                }`}>
                    {content}
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
                <div className={`relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    isOwn
                        ? 'bg-[#10B981] text-white rounded-tr-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                }`}>
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
export default function ChatRoom({ auth, group, messages: initialMessages, groups }) {
    const [messages, setMessages] = useState(initialMessages ?? []);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [botLoading, setBotLoading] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showStatusPicker, setShowStatusPicker] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll ke bawah saat ada pesan baru
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Setup Laravel Echo — listen ke PresenceChannel
    useEffect(() => {
        if (!window.Echo) return;

        const channel = window.Echo.join(`chat.${group.id}`)
            .here(users => setOnlineUsers(users))
            .joining(user => setOnlineUsers(prev => [...prev, user]))
            .leaving(user => setOnlineUsers(prev => prev.filter(u => u.id !== user.id)))
            .listen('MessageSent', e => {
                setMessages(prev => [...prev, e.message]);
            });

        return () => {
            window.Echo.leave(`chat.${group.id}`);
        };
    }, [group.id]);

    // Trigger SyncBot standup reminder
    const triggerStandup = async () => {
        if (botLoading) return;
        setBotLoading(true);
        try {
            await axios.post(route('bot.trigger-standup', group.id));
        } catch (err) {
            console.error('Bot trigger failed:', err);
        } finally {
            setBotLoading(false);
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
            const res = await axios.post(route('send.message', group.id), { message: text });
            // Ganti optimistic dengan data dari server
            setMessages(prev => prev.map(m => m.id === optimistic.id ? res.data.message : m));
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
            <Head title={`#${group.name} — Briefly`} />

            {/* ── LEFT SIDEBAR ── */}
            <aside className={`flex flex-col bg-[#0F172A] text-slate-300 transition-all duration-300 shrink-0 ${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'}`}>
                {/* Workspace header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-slate-700/60 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#10B981] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="font-semibold text-white text-sm">Briefly</span>
                    </div>
                    <IconChevronDown size={15} className="text-slate-400" />
                </div>

                {/* Nav items */}
                <div className="px-2 py-3 space-y-0.5 border-b border-slate-700/60">
                    {[
                        { icon: IconHome, label: 'Dashboard', href: route('dashboard.owner') },
                        { icon: IconBell, label: 'Notifikasi', href: '#' },
                        { icon: IconAt, label: 'Mentions', href: '#' },
                    ].map(item => (
                        <Link key={item.label} href={item.href}
                            className="flex items-center gap-2.5 px-2 py-1.5 text-sm rounded-md text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors">
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Channels / Groups */}
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-4 pt-2 pb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Channels</span>
                        <Link href={route('workspace.create')}>
                            <IconPlus size={14} className="text-slate-500 hover:text-white transition-colors" />
                        </Link>
                    </div>
                    {(groups ?? []).map(g => (
                        <Link
                            key={g.id}
                            href={route('chat.show', g.id)}
                            className={`flex items-center gap-2 px-4 py-1.5 text-sm transition-colors rounded-md mx-2 ${
                                g.id === group.id
                                    ? 'bg-slate-700/70 text-white font-medium'
                                    : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-200'
                            }`}
                        >
                            <IconHash size={15} />
                            <span className="truncate">{g.name}</span>
                        </Link>
                    ))}
                </div>

                {/* User footer */}
                <div className="p-3 border-t border-slate-700/60 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColor(auth.user.name)}`}>
                        {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{auth.user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{auth.user.email}</p>
                    </div>
                    <Link href={route('logout')} method="post" as="button" title="Logout">
                        <IconLogout size={16} className="text-slate-500 hover:text-red-400 transition-colors" />
                    </Link>
                </div>
            </aside>

            {/* ── MAIN AREA ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Channel Header */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 shadow-sm">
                    <button onClick={() => setSidebarOpen(s => !s)} className="text-slate-500 hover:text-slate-800 transition-colors">
                        <IconHash size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-slate-800 text-base truncate">{group.name}</h1>
                        {group.description && (
                            <p className="text-xs text-slate-500 truncate">{group.description}</p>
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
                    
                    {/* Bot Trigger Button */}
                    <button
                        onClick={triggerStandup}
                        disabled={botLoading}
                        className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors border border-indigo-200 disabled:opacity-50 text-xs font-semibold shadow-sm"
                        title="Panggil SyncBot"
                    >
                        {botLoading ? (
                            <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <IconRobot size={16} />
                        )}
                        SyncBot
                    </button>
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
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage(e);
                                    }
                                }}
                                placeholder={`Kirim pesan ke #${group.name}... (Enter untuk kirim, Shift+Enter untuk baris baru)`}
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
                    <p className="text-center text-[11px] text-slate-400 mt-2">
                        Gunakan <kbd className="bg-slate-100 border border-slate-200 rounded px-1 text-slate-500 font-mono text-[10px]">Shift+Enter</kbd> untuk baris baru
                    </p>
                </div>
            </div>
        </div>
    );
}
