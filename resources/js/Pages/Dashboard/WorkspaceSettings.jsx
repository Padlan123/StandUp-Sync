import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    IconSettings, IconBuilding, IconKey, IconTrash,
    IconCheck, IconAlertTriangle, IconHash, IconEdit,
    IconPlus, IconCopy,
} from '@tabler/icons-react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function WorkspaceSettings({ auth, groups }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [copiedCode, setCopiedCode] = useState(null);
    const [saved, setSaved] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const groupList = groups || [];
    const [selectedGroup, setSelectedGroup] = useState(groupList[0] || null);
    const [groupName, setGroupName] = useState(selectedGroup?.name || '');
    const [groupDesc, setGroupDesc] = useState(selectedGroup?.description || '');

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        setGroupName(group.name || '');
        setGroupDesc(group.description || '');
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleCopyCode = (code, id) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(id);
            setTimeout(() => setCopiedCode(null), 2000);
        });
    };

    const tabs = [
        { id: 'general', label: 'General', icon: IconBuilding },
        { id: 'invite', label: 'Invite & Access', icon: IconKey },
        { id: 'danger', label: 'Danger Zone', icon: IconAlertTriangle },
    ];

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="Workspace Settings – Briefly" />
            <DashboardSidebar auth={auth} groups={groupList} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-3xl mx-auto">

                        {/* Header */}
                        <div className="mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                <IconSettings size={22} className="text-slate-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Workspace Settings</h1>
                                <p className="text-slate-500 text-sm mt-0.5">Manage your workspace configuration.</p>
                            </div>
                        </div>

                        {/* Workspace Selector */}
                        {groupList.length > 1 && (
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Workspace</label>
                                <div className="flex flex-wrap gap-2">
                                    {groupList.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => handleGroupSelect(g)}
                                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors font-medium ${
                                                selectedGroup?.id === g.id
                                                    ? 'bg-emerald-500 text-white border-emerald-500'
                                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            {g.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {groupList.length === 0 ? (
                            <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <IconBuilding size={22} className="text-slate-400" />
                                </div>
                                <h2 className="text-base font-semibold text-slate-700 mb-1">No Workspaces Yet</h2>
                                <p className="text-sm text-slate-400 mb-4">Create your first workspace to start managing settings.</p>
                                <a href={route('workspace.create')} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                                    <IconPlus size={16} /> Create Workspace
                                </a>
                            </div>
                        ) : (
                            <>
                                {/* Tab Nav */}
                                <div className="flex gap-1 mb-6 border-b border-slate-200">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                                                activeTab === tab.id
                                                    ? tab.id === 'danger' ? 'border-rose-500 text-rose-600' : 'border-emerald-500 text-emerald-600'
                                                    : 'border-transparent text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            <tab.icon size={15} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab: General */}
                                {activeTab === 'general' && (
                                    <div className="space-y-5">
                                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                            <h2 className="font-semibold text-slate-900 mb-4">Workspace Info</h2>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Workspace Name</label>
                                                    <input
                                                        type="text"
                                                        value={groupName}
                                                        onChange={e => setGroupName(e.target.value)}
                                                        className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                                        placeholder="e.g. Engineering Team"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Description <span className="text-slate-400 font-normal">(optional)</span></label>
                                                    <textarea
                                                        rows={3}
                                                        value={groupDesc}
                                                        onChange={e => setGroupDesc(e.target.value)}
                                                        className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                                                        placeholder="Brief description of this workspace..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-5">
                                                <button
                                                    onClick={handleSave}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                                                >
                                                    {saved ? <><IconCheck size={15} /> Saved!</> : <><IconEdit size={15} /> Save Changes</>}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Channels Overview */}
                                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                                <h2 className="font-semibold text-slate-900">Channels</h2>
                                                <span className="text-xs text-slate-400">{selectedGroup?.channels?.length || 0} channels</span>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                {(selectedGroup?.channels || []).map(ch => (
                                                    <div key={ch.id} className="flex items-center gap-3 px-6 py-3">
                                                        <IconHash size={15} className="text-slate-400 shrink-0" />
                                                        <span className="text-sm text-slate-700">{ch.name}</span>
                                                    </div>
                                                ))}
                                                {(!selectedGroup?.channels || selectedGroup.channels.length === 0) && (
                                                    <div className="px-6 py-4 text-sm text-slate-400 italic">No channels yet.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tab: Invite & Access */}
                                {activeTab === 'invite' && (
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <h2 className="font-semibold text-slate-900 mb-1">Invite Code</h2>
                                        <p className="text-sm text-slate-500 mb-5">Share this code with team members so they can join your workspace.</p>
                                        <div className="flex items-center gap-3 mb-6">
                                            <code className="flex-1 text-sm bg-slate-100 text-slate-800 px-4 py-3 rounded-xl font-mono border border-slate-200 tracking-widest">
                                                {selectedGroup?.invite_code || 'BRF-XXXX-XXX'}
                                            </code>
                                            <button
                                                onClick={() => handleCopyCode(selectedGroup?.invite_code || 'BRF-XXXX-XXX', selectedGroup?.id)}
                                                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                                                    copiedCode === selectedGroup?.id
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                }`}
                                            >
                                                {copiedCode === selectedGroup?.id ? <><IconCheck size={15} /> Copied!</> : <><IconCopy size={15} /> Copy</>}
                                            </button>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                                            <p className="font-semibold mb-1 flex items-center gap-1.5"><IconKey size={14} /> How it works</p>
                                            <p className="text-blue-700 leading-relaxed">Members register with this invite code to automatically join your workspace. You can generate a new code anytime — old codes will be invalidated.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Tab: Danger Zone */}
                                {activeTab === 'danger' && (
                                    <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <div className="flex items-start gap-3 mb-5">
                                            <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center shrink-0">
                                                <IconAlertTriangle size={18} className="text-rose-600" />
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-rose-900">Danger Zone</h2>
                                                <p className="text-sm text-rose-600 mt-0.5">These actions are irreversible. Please proceed with caution.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">Archive Workspace</p>
                                                    <p className="text-xs text-slate-400">Disable new messages but keep all history.</p>
                                                </div>
                                                <button className="px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
                                                    Archive
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-rose-200 rounded-xl bg-rose-50/50">
                                                <div>
                                                    <p className="text-sm font-semibold text-rose-800">Delete Workspace</p>
                                                    <p className="text-xs text-rose-400">Permanently delete this workspace and all its data.</p>
                                                </div>
                                                <button
                                                    onClick={() => setConfirmDelete(selectedGroup?.id)}
                                                    className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1.5"
                                                >
                                                    <IconTrash size={14} /> Delete
                                                </button>
                                            </div>
                                        </div>

                                        {confirmDelete && (
                                            <div className="mt-4 p-4 bg-rose-100 border border-rose-300 rounded-xl">
                                                <p className="text-sm font-semibold text-rose-900 mb-3">Are you sure? This action cannot be undone.</p>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                                                    <button className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors">Yes, Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
