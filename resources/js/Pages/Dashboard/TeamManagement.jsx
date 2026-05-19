import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    IconUsers, IconSearch, IconCopy, IconCheck,
    IconShield, IconUser, IconBuilding, IconX,
} from '@tabler/icons-react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function TeamManagement({ auth, groups, members }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [copiedCode, setCopiedCode] = useState(null);

    const groupList = groups || [];
    const memberList = members || [];

    const filteredMembers = memberList.filter(member => {
        const matchesSearch =
            member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGroup =
            selectedGroup === 'all' ||
            member.groups?.some(g => String(g.id) === String(selectedGroup));
        return matchesSearch && matchesGroup;
    });

    const handleCopyCode = (code, groupId) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(groupId);
            setTimeout(() => setCopiedCode(null), 2000);
        });
    };

    const getRoleBadge = (roles) => {
        const role = Array.isArray(roles) ? roles[0] : roles;
        if (role === 'owner')
            return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-violet-100 text-violet-700 rounded-full"><IconShield size={10} /> Owner</span>;
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full"><IconUser size={10} /> Member</span>;
    };

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="Team Management – Briefly" />
            <DashboardSidebar auth={auth} groups={groupList} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-5xl mx-auto">

                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <IconUsers size={22} className="text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Team Management</h1>
                                    <p className="text-slate-500 text-sm mt-0.5">Manage members across all your workspaces.</p>
                                </div>
                            </div>
                            <span className="text-sm text-slate-500 shrink-0">{memberList.length} total members</span>
                        </div>

                        {/* Invite Code Cards */}
                        <div className="mb-8">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Workspace Invite Codes</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groupList.map(group => (
                                    <div key={group.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <IconBuilding size={16} className="text-emerald-600" />
                                            </div>
                                            <span className="text-xs text-slate-400">{group.channels?.length || 0} channels</span>
                                        </div>
                                        <p className="font-semibold text-slate-900 text-sm truncate mb-2">{group.name}</p>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-md font-mono truncate border border-slate-200">
                                                {group.invite_code || 'BRF-XXXX-XXX'}
                                            </code>
                                            <button
                                                onClick={() => handleCopyCode(group.invite_code || 'BRF-XXXX-XXX', group.id)}
                                                className={`shrink-0 p-1.5 rounded-md transition-colors ${copiedCode === group.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                                            >
                                                {copiedCode === group.id ? <IconCheck size={15} /> : <IconCopy size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {groupList.length === 0 && (
                                    <div className="col-span-3 py-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                                        No workspaces yet. Create one to get an invite code.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Members Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <div className="relative flex-1 w-full sm:max-w-xs">
                                    <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            <IconX size={13} />
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={selectedGroup}
                                    onChange={e => setSelectedGroup(e.target.value)}
                                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    <option value="all">All Workspaces</option>
                                    {groupList.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                                            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Workspaces</th>
                                            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredMembers.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                                                    {searchQuery ? `No members found for "${searchQuery}"` : 'No members yet.'}
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredMembers.map(member => (
                                                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                                {member.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-slate-900">{member.name}</p>
                                                                <p className="text-xs text-slate-400">{member.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{getRoleBadge(member.roles)}</td>
                                                    <td className="px-6 py-4 hidden sm:table-cell">
                                                        <div className="flex flex-wrap gap-1">
                                                            {member.groups?.map(g => (
                                                                <span key={g.id} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{g.name}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell text-slate-500">
                                                        {member.created_at ? new Date(member.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
