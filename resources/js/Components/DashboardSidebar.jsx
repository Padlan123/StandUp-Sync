import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
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
    IconDownload,
    IconLogout,
    IconHash,
    IconChevronDown,
    IconChevronRight,
    IconDots,
    IconEdit,
    IconTrash,
    IconX,
    IconArrowRight,
} from '@tabler/icons-react';

function WorkspaceItem({ group, currentChannelId, onEdit, onAddChannel, onArchive, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(() => {
        // Cek localStorage dulu
        const savedState = localStorage.getItem(`workspace_expanded_${group.id}`);
        if (savedState !== null) {
            return savedState === 'true';
        }
        // Fallback default: buka jika ada channel yang aktif
        return group.channels?.some(c => c.id === currentChannelId) || false;
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleExpanded = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);
        localStorage.setItem(`workspace_expanded_${group.id}`, newState.toString());
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuClick = (action) => {
        setIsMenuOpen(false);
        action(group);
    };

    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between px-2 mb-1 group relative">
                <button 
                    onClick={toggleExpanded}
                    className="flex-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors text-left"
                >
                    {isExpanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                    <span className="truncate">{group.name}</span>
                </button>
                
                <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                    >
                        <IconDots size={14} />
                    </button>
                    
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] z-50 py-1">
                            <button onClick={() => handleMenuClick(onEdit)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                                <IconEdit size={14} className="text-slate-400" />
                                Edit Workspace
                            </button>
                            <button onClick={() => handleMenuClick(onAddChannel)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                                <IconPlus size={14} className="text-slate-400" />
                                Tambah Channel
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button onClick={() => handleMenuClick(onArchive)} className="w-full text-left px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2">
                                <IconArchive size={14} className="text-amber-500" />
                                {group.is_archived ? 'Buka Arsip Workspace' : 'Arsipkan Workspace'}
                            </button>
                            <button onClick={() => handleMenuClick(onDelete)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <IconTrash size={14} className="text-red-500" />
                                Hapus Workspace
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {isExpanded && (
                <div className="pl-6 space-y-0.5">
                    {group.channels && group.channels.map(channel => (
                        <Link 
                            key={channel.id} 
                            href={route('chat.show', channel.id)}
                            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors truncate ${
                                channel.id === currentChannelId
                                    ? 'bg-emerald-50 text-emerald-700 font-medium' 
                                    : 'text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            <IconHash size={16} className="text-slate-400" />
                            {channel.name}
                        </Link>
                    ))}
                    {(!group.channels || group.channels.length === 0) && (
                        <p className="text-xs text-slate-400 italic px-2 py-1">No channels yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

function SearchModal({ isOpen, onClose, groups }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
        if (!isOpen) setQuery('');
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const menuItems = [
        { name: 'Main Overview', href: route('dashboard.owner'), icon: IconHome, desc: 'Dashboard utama' },
        { name: 'SyncBot Control Center', href: route('dashboard.syncbot'), icon: IconRobot, desc: 'Konfigurasi bot otomatis' },
        { name: 'Team Management', href: route('dashboard.team'), icon: IconUsers, desc: 'Kelola anggota tim' },
        { name: 'Blocker Radar', href: route('dashboard.blockers'), icon: IconRadar, desc: 'Pantau blocker hari ini' },
        { name: 'Daily Report Archive', href: route('dashboard.reports'), icon: IconArchive, desc: 'Arsip laporan harian' },
        { name: 'Workspace Settings', href: route('dashboard.settings'), icon: IconSettings, desc: 'Pengaturan workspace' },
    ];

    const allChannels = (groups || []).flatMap(g =>
        (g.channels || []).map(ch => ({
            name: `#${ch.name}`,
            href: route('chat.show', ch.id),
            icon: IconHash,
            desc: `Channel di ${g.name}`,
        }))
    );

    const allItems = [...menuItems, ...allChannels];

    const filtered = query.trim()
        ? allItems.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
          )
        : menuItems;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4" onClick={onClose}>
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
                    <IconSearch size={16} className="text-slate-400 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search pages, channels..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                    />
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <IconX size={16} />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-72 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <div className="py-10 text-center text-slate-400 text-sm">
                            No results for "{query}"
                        </div>
                    ) : (
                        <div className="py-2">
                            {!query && <p className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Pages</p>}
                            {filtered.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                                        <item.icon size={14} className="text-slate-500 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                    <IconArrowRight size={13} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-4 py-2.5 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-400">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">↵</span> to select
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">Esc</span> to close
                </div>
            </div>
        </div>
    );
}

export default function DashboardSidebar({ auth, groups = [], isCollapsed, setIsCollapsed, currentChannelId = null }) {
    const { url } = usePage();
    const [searchOpen, setSearchOpen] = useState(false);
    const [modalState, setModalState] = useState({ type: null, group: null });
    const [formData, setFormData] = useState({ name: '', description: '' });

    const openModal = (type, group) => {
        setModalState({ type, group });
        if (type === 'edit') {
            setFormData({ name: group.name, description: group.description || '' });
        } else if (type === 'addChannel') {
            setFormData({ name: '', description: '' });
        }
    };

    const closeModal = () => setModalState({ type: null, group: null });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { type, group } = modalState;
        if (type === 'edit') {
            router.put(route('group.update', group.id), formData, { onSuccess: closeModal });
        } else if (type === 'addChannel') {
            router.post(route('group.channel.store', group.id), formData, { onSuccess: closeModal });
        }
    };

    const handleConfirm = () => {
        const { type, group } = modalState;
        if (type === 'archive') {
            router.post(route('group.archive', group.id), {}, { onSuccess: closeModal });
        } else if (type === 'delete') {
            router.delete(route('group.destroy', group.id), { onSuccess: closeModal });
        }
    };

    const menuItems = [
        { name: 'Main Overview', icon: IconHome, href: route('dashboard.owner') },
        { name: 'SyncBot Control Center', icon: IconRobot, href: route('dashboard.syncbot') },
        { name: 'Team Management', icon: IconUsers, href: route('dashboard.team') },
        { name: 'Blocker Radar', icon: IconRadar, href: route('dashboard.blockers') },
        { name: 'Daily Report Archive', icon: IconArchive, href: route('dashboard.reports') },
        { name: 'Workspace Settings', icon: IconSettings, href: route('dashboard.settings') },
    ];

    const isActive = (href) => url === href || url.startsWith(href + '?');

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} groups={groups} />

            <aside 
                className={`flex flex-col border-r border-slate-200 bg-[#F9F9F9] transition-all duration-300 ease-in-out shrink-0 ${isCollapsed ? 'w-16' : 'w-64'}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center h-14 px-3 overflow-hidden whitespace-nowrap">
                    <div className={`flex items-center gap-2 overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        <img src="/img/logo/logo-main.svg" alt="Briefly" className="w-5 h-5 shrink-0" onError={(e) => e.target.style.display = 'none'} />
                        <span className="font-semibold text-sm">Briefly</span>
                    </div>

                    <div className="flex-1 transition-all duration-300"></div>

                    <div className="w-10 shrink-0 flex items-center justify-center h-full">
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 transition-colors focus:outline-none"
                            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {isCollapsed ? <IconLayoutSidebarLeftExpand size={18} stroke={1.5} /> : <IconLayoutSidebarLeftCollapse size={18} stroke={1.5} />}
                        </button>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="px-3 py-2 space-y-1">
                    <Link
                        href={route('workspace.create')}
                        className="flex items-center w-full h-9 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors overflow-hidden whitespace-nowrap"
                        title={isCollapsed ? 'New Workspace' : ''}
                    >
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <div className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full text-white">
                                <IconPlus size={14} stroke={2} />
                            </div>
                        </div>
                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>New Workspace</span>
                    </Link>

                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center w-full h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-200 transition-colors overflow-hidden whitespace-nowrap"
                        title={isCollapsed ? 'Search' : ''}
                    >
                        <div className="w-10 shrink-0 flex items-center justify-center h-full">
                            <IconSearch size={18} stroke={1.5} className="text-slate-500" />
                        </div>
                        <span className={`flex-1 text-left transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Search</span>
                        {!isCollapsed && (
                            <span className="mr-2 text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-mono">⌘K</span>
                        )}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                    <nav className="px-3 space-y-0.5">
                        {menuItems.map((item, index) => {
                            const active = isActive(item.href);
                            return (
                                <Link 
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center w-full h-9 text-sm rounded-md transition-colors group overflow-hidden whitespace-nowrap ${
                                        active
                                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                                            : 'text-slate-700 hover:bg-slate-200'
                                    }`}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <div className="w-10 shrink-0 flex items-center justify-center h-full">
                                        <item.icon
                                            size={18}
                                            stroke={1.5}
                                            className={`transition-colors ${active ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'}`}
                                        />
                                    </div>
                                    <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 pr-3'}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className={`px-5 mt-6 mb-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 invisible overflow-hidden' : 'opacity-100 visible overflow-visible'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Workspaces</h3>
                        </div>
                        
                        <div className="space-y-2">
                            {groups.map(group => (
                                <WorkspaceItem 
                                    key={group.id} 
                                    group={group} 
                                    currentChannelId={currentChannelId}
                                    onEdit={(g) => openModal('edit', g)}
                                    onAddChannel={(g) => openModal('addChannel', g)}
                                    onArchive={(g) => openModal('archive', g)}
                                    onDelete={(g) => openModal('delete', g)}
                                />
                            ))}
                            
                            {groups.length === 0 && (
                                <p className="text-xs text-slate-500 italic px-2">No workspaces yet.</p>
                            )}
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

            {/* Modals */}
            {modalState.type && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        {(modalState.type === 'edit' || modalState.type === 'addChannel') && (
                            <form onSubmit={handleFormSubmit}>
                                <div className="p-5 border-b border-slate-100">
                                    <h3 className="font-semibold text-lg text-slate-800">
                                        {modalState.type === 'edit' ? 'Edit Workspace' : 'Tambah Channel'}
                                    </h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={formData.name} 
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi (Opsional)</label>
                                        <textarea 
                                            rows={3}
                                            value={formData.description} 
                                            onChange={e => setFormData({...formData, description: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 flex justify-end gap-2 border-t border-slate-100">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700">Simpan</button>
                                </div>
                            </form>
                        )}
                        {(modalState.type === 'archive' || modalState.type === 'delete') && (
                            <div>
                                <div className="p-5 border-b border-slate-100">
                                    <h3 className={`font-semibold text-lg ${modalState.type === 'delete' ? 'text-red-600' : 'text-amber-600'}`}>
                                        {modalState.type === 'delete' ? 'Hapus Workspace' : (modalState.group.is_archived ? 'Buka Arsip Workspace' : 'Arsipkan Workspace')}
                                    </h3>
                                </div>
                                <div className="p-5">
                                    <p className="text-slate-600 text-sm">
                                        {modalState.type === 'delete' 
                                            ? `Apakah Anda yakin ingin menghapus workspace "${modalState.group.name}" secara permanen? Semua channel dan pesan di dalamnya akan ikut terhapus dan tidak dapat dikembalikan.`
                                            : `Apakah Anda yakin ingin ${modalState.group.is_archived ? 'membuka arsip' : 'mengarsipkan'} workspace "${modalState.group.name}"?`
                                        }
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 flex justify-end gap-2 border-t border-slate-100">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                    <button onClick={handleConfirm} className={`px-4 py-2 text-sm font-medium text-white rounded-md ${modalState.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-500 hover:bg-amber-600'}`}>
                                        Ya, Lanjutkan
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

