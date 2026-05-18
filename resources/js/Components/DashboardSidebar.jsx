import React from 'react';
import { Link } from '@inertiajs/react';
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
    IconMessageCircle, 
    IconDownload,
    IconLogout,
    IconHash
} from '@tabler/icons-react';

export default function DashboardSidebar({ auth, groups = [], isCollapsed, setIsCollapsed, currentGroupId = null }) {
    const isOwner = auth.user.roles?.includes('owner') || true; // TODO: implement proper role check if needed
    
    // We can define base menu items
    const menuItems = [
        { name: 'Main Overview', icon: IconHome, href: route('dashboard.owner') },
        { name: 'SyncBot Control Center', icon: IconRobot, href: '#' },
        { name: 'Team Management', icon: IconUsers, href: '#' },
        { name: 'Blocker Radar', icon: IconRadar, href: '#' },
        { name: 'Daily Report Archive', icon: IconArchive, href: '#' },
        { name: 'Workspace Settings', icon: IconSettings, href: '#' },
    ];

    return (
        <aside 
            className={`flex flex-col border-r border-slate-200 bg-[#F9F9F9] transition-all duration-300 ease-in-out shrink-0 ${isCollapsed ? 'w-16' : 'w-64'}`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center h-14 px-3 overflow-hidden whitespace-nowrap">
                {/* Brand Logo & Name */}
                <div className={`flex items-center gap-2 overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                    <img src="/img/logo/logo-main.svg" alt="Briefly" className="w-5 h-5 shrink-0" onError={(e) => e.target.style.display = 'none'} />
                    <span className="font-semibold text-sm">Briefly</span>
                </div>

                {/* Spacer to push toggle to the right */}
                <div className="flex-1 transition-all duration-300"></div>

                {/* Icon Container for Header Toggle */}
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

                <button className="flex items-center w-full h-9 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-200 transition-colors overflow-hidden whitespace-nowrap">
                    <div className="w-10 shrink-0 flex items-center justify-center h-full">
                        <IconSearch size={18} stroke={1.5} className="text-slate-500" />
                    </div>
                    <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Search</span>
                </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                <nav className="px-3 space-y-0.5">
                    {menuItems.map((item, index) => (
                        <Link 
                            key={index}
                            href={item.href}
                            className="flex items-center w-full h-9 text-sm text-slate-700 rounded-md hover:bg-slate-200 transition-colors group overflow-hidden whitespace-nowrap"
                            title={isCollapsed ? item.name : ''}
                        >
                            <div className="w-10 shrink-0 flex items-center justify-center h-full">
                                <item.icon size={18} stroke={1.5} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
                            </div>
                            <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 pr-3'}`}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div className={`px-5 mt-6 mb-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 invisible' : 'opacity-100 visible'}`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Channels</h3>
                    </div>
                    <div className="mt-2 space-y-1">
                        {groups.map(group => (
                            <Link 
                                key={group.id} 
                                href={route('chat.show', group.id)} 
                                className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors truncate ${
                                    currentGroupId == group.id 
                                        ? 'bg-emerald-50 text-emerald-700 font-medium' 
                                        : 'text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                <IconHash size={16} className={currentGroupId == group.id ? 'text-emerald-600' : 'text-slate-400'} />
                                {group.name}
                            </Link>
                        ))}
                        {groups.length === 0 && (
                            <p className="text-xs text-slate-500 italic px-2">No channels yet.</p>
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
    );
}
