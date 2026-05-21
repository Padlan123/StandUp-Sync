import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    IconRobot,
    IconPlayerPlay,
    IconClock,
    IconBell,
    IconToggleRight,
    IconToggleLeft,
    IconSettings,
    IconMessageCircle,
    IconCheck,
    IconAlertCircle,
    IconSend,
    IconRefresh,
    IconActivity,
    IconBrandDiscord,
} from '@tabler/icons-react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function SyncBotControlCenter({ auth, groups, recentLogs }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const groupList = groups || [];
    const [selectedGroup, setSelectedGroup] = useState(groupList[0] || null);

    // Form states
    const [botEnabled, setBotEnabled] = useState(true);
    const [reminderTime, setReminderTime] = useState('09:00');
    const [sendToChat, setSendToChat] = useState(true);
    const [sendToDiscord, setSendToDiscord] = useState(false);
    const [discordChannelId, setDiscordChannelId] = useState('');

    const [triggeringGroup, setTriggeringGroup] = useState(null);
    const [savedSuccess, setSavedSuccess] = useState(false);

    // Effect to update local form states when selected group changes
    useEffect(() => {
        if (selectedGroup) {
            const config = selectedGroup.bot_config || {};
            setBotEnabled(config.is_active ?? true);
            setReminderTime(config.reminder_time ? config.reminder_time.slice(0, 5) : '09:00');
            setSendToChat(config.send_to_chat ?? true);
            setSendToDiscord(config.send_to_discord ?? false);
            setDiscordChannelId(config.discord_channel_id ?? '');
        }
    }, [selectedGroup]);

    const logs = recentLogs || [
        { id: 1, time: '09:00', message: 'Daily standup reminder sent to all channels', type: 'success', group: 'Engineering Team' },
        { id: 2, time: '09:02', message: '4 members responded with status update', type: 'info', group: 'Engineering Team' },
        { id: 3, time: '09:05', message: '1 blocker detected - flagged for review', type: 'warning', group: 'Design Team' },
    ];

    const handleTriggerStandup = async (channelId, groupName) => {
        setTriggeringGroup(groupName);
        try {
            await router.post(route('bot.trigger-standup', channelId), {}, {
                onFinish: () => setTriggeringGroup(null),
            });
        } catch (e) {
            setTriggeringGroup(null);
        }
    };

    const handleSaveConfig = () => {
        if (!selectedGroup) return;

        router.put(route('bot-config.update', selectedGroup.id), {
            is_active: botEnabled,
            reminder_time: reminderTime,
            send_to_chat: sendToChat,
            send_to_discord: sendToDiscord,
            discord_channel_id: discordChannelId,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSavedSuccess(true);
                setTimeout(() => setSavedSuccess(false), 2500);
            }
        });
    };

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="SyncBot Control Center – Briefly" />
            <DashboardSidebar
                auth={auth}
                groups={groupList}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">

                        {/* Page Header */}
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                        <IconRobot size={22} className="text-emerald-600" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">SyncBot Control Center</h1>
                                </div>
                                <p className="mt-1 text-slate-500 ml-13 pl-1">Configure and manage your automated daily stand-up bot.</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${botEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${botEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                    {botEnabled ? 'Bot Active' : 'Bot Inactive'}
                                </span>
                                {groupList.length > 0 && (
                                    <select
                                        value={selectedGroup?.id || ''}
                                        onChange={(e) => setSelectedGroup(groupList.find(g => g.id == e.target.value))}
                                        className="text-sm border-slate-200 rounded-lg focus:ring-emerald-400 py-1.5 px-3"
                                    >
                                        {groupList.map(g => (
                                            <option key={g.id} value={g.id}>{g.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        {groupList.length === 0 ? (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
                                You need to create a Workspace first to configure the bot.
                            </div>
                        ) : (
                            <>
                                {/* Main Toggle Card */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-base font-semibold text-slate-900">SyncBot Automation for {selectedGroup?.name}</h2>
                                            <p className="text-sm text-slate-500 mt-0.5">Automatically send daily stand-up reminders to all workspace channels.</p>
                                        </div>
                                        <button
                                            onClick={() => setBotEnabled(!botEnabled)}
                                            className={`transition-colors ${botEnabled ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {botEnabled
                                                ? <IconToggleRight size={40} stroke={1.5} />
                                                : <IconToggleLeft size={40} stroke={1.5} />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* Configuration Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Reminder Time */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IconClock size={18} className="text-emerald-500" />
                                            <h3 className="font-semibold text-slate-900">Reminder Time</h3>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4">Set the daily time SyncBot sends the stand-up prompt.</p>
                                        <input
                                            type="time"
                                            value={reminderTime}
                                            onChange={e => setReminderTime(e.target.value)}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                        />
                                        <p className="text-xs text-slate-400 mt-2">Timezone: WIB (UTC+7)</p>
                                    </div>

                                    {/* Notification Style */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IconBell size={18} className="text-emerald-500" />
                                            <h3 className="font-semibold text-slate-900">Notification Channels</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between cursor-pointer group">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">In-App Chat</p>
                                                    <p className="text-xs text-slate-400">Send reminder inside Briefly chat</p>
                                                </div>
                                                <div onClick={(e) => { e.preventDefault(); setSendToChat(!sendToChat); }} className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${sendToChat ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${sendToChat ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                </div>
                                            </label>
                                            
                                            <div className="border-t border-slate-100 pt-3">
                                                <label className="flex items-center justify-between cursor-pointer group mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <IconBrandDiscord size={18} className="text-[#5865F2]" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800">Discord Bot</p>
                                                            <p className="text-xs text-slate-400">Forward reminder to Discord channel</p>
                                                        </div>
                                                    </div>
                                                    <div onClick={(e) => { e.preventDefault(); setSendToDiscord(!sendToDiscord); }} className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${sendToDiscord ? 'bg-[#5865F2]' : 'bg-slate-200'}`}>
                                                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${sendToDiscord ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                    </div>
                                                </label>
                                                
                                                {sendToDiscord && (
                                                    <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                                                        <input
                                                            type="text"
                                                            placeholder="Discord Channel ID (e.g. 150519830...)"
                                                            value={discordChannelId}
                                                            onChange={e => setDiscordChannelId(e.target.value)}
                                                            className="w-full text-sm border-slate-200 rounded-lg focus:ring-[#5865F2] focus:border-[#5865F2] py-2 px-3"
                                                        />
                                                        <p className="text-[10px] text-slate-400 mt-1">Right-click a channel in Discord and "Copy Channel ID" (Developer mode must be on)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save Config Button */}
                                <div className="flex justify-end mb-8">
                                    <button
                                        onClick={handleSaveConfig}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                                    >
                                        {savedSuccess ? <><IconCheck size={16} /> Saved!</> : <><IconSettings size={16} /> Save Configuration</>}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Manual Trigger Per Group */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] mb-6">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                                <IconSend size={18} className="text-slate-400" />
                                <h2 className="font-semibold text-slate-900">Manual Trigger</h2>
                                <span className="ml-auto text-xs text-slate-400">Trigger stand-up instantly for a workspace</span>
                            </div>
                            {groupList.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-sm">No workspaces found. Create one first.</div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {groupList.map(group => (
                                        <div key={group.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div>
                                                <p className="font-medium text-slate-800 text-sm">{group.name}</p>
                                                <p className="text-xs text-slate-400">{group.channels?.length || 0} channels</p>
                                            </div>
                                            {group.channels && group.channels[0] ? (
                                                <button
                                                    onClick={() => handleTriggerStandup(group.channels[0].id, group.name)}
                                                    disabled={triggeringGroup === group.name}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                >
                                                    {triggeringGroup === group.name
                                                        ? <><IconRefresh size={13} className="animate-spin" /> Sending...</>
                                                        : <><IconPlayerPlay size={13} /> Trigger Now</>
                                                    }
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-400">No channels</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Activity Log */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                                <IconActivity size={18} className="text-slate-400" />
                                <h2 className="font-semibold text-slate-900">Recent Activity</h2>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {logs.map(log => (
                                    <div key={log.id} className="px-6 py-3.5 flex items-start gap-3">
                                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                            log.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                            log.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {log.type === 'success' ? <IconCheck size={12} /> :
                                             log.type === 'warning' ? <IconAlertCircle size={12} /> :
                                             <IconMessageCircle size={12} />}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-700">{log.message}</p>
                                            <p className="text-xs text-slate-400">{log.group} · Today at {log.time}</p>
                                        </div>
                                    </div>
                                ))}
                                {logs.length === 0 && (
                                    <div className="p-8 text-center text-slate-400 text-sm">No recent activity yet.</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
