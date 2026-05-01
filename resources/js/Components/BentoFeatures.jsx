import React from 'react';
import { 
    IconRobot, IconMessage, IconLayoutDashboard, 
    IconBuilding, IconClockOff, IconRocket, IconBrandWechat
} from '@tabler/icons-react';

export default function BentoFeatures() {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">Platform Features</span>
                <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Elevate your team syncs<br/>with the modern stand-up.
                </h2>
                <p className="mt-6 text-xl text-slate-500">
                    Briefly is packed with intelligent tools designed to make daily reporting effortless, organized, and transparent for everyone on your team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large Box - Auto SyncBot */}
                <div className="md:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                        <IconRobot size={240} className="text-[#10B981]" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-6">
                            <IconRobot className="text-[#10B981]" size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Automated Daily SyncBot</h3>
                        <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                            Our intelligent bot automatically reminds your team at 09:00 AM every single day. No more manual chasing or forgotten updates. Let the system do the heavy lifting.
                        </p>
                        
                        <div className="mt-10 bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm shadow-inner relative">
                            <div className="absolute -left-3 top-6 w-6 h-6 bg-slate-50 transform rotate-45 border-l border-b border-slate-100"></div>
                            <div className="flex items-start gap-4 mb-2 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <IconRobot size={20} />
                                </div>
                                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-slate-600 shadow-sm leading-relaxed">
                                    Good morning team! 👋 <br/>What did you accomplish yesterday? Any blockers?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medium Box - Smart Chat Parsing */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <IconMessage className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Smart Chat Parsing</h3>
                    <p className="text-slate-500 leading-relaxed flex-1">
                        Transform messy chat conversations into structured data. Our engine instantly detects statuses from natural replies.
                    </p>
                    <div className="mt-8 flex gap-3 flex-wrap">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-black tracking-widest shadow-sm">SAFE</span>
                        <span className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-black tracking-widest shadow-sm">BLOCKER</span>
                    </div>
                </div>

                {/* Medium Box - Tenant Isolation */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <IconBuilding className="text-purple-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Multi-Tenant Isolation</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Manage multiple companies or teams in one system securely. Complete data isolation with unique Workspaces.
                    </p>
                </div>

                {/* Large Box - Dashboard */}
                <div className="md:col-span-2 bg-slate-900 rounded-[2rem] border border-slate-800 p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
                    {/* Glow effect */}
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#10B981] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="relative z-10 w-full md:w-1/2 flex flex-col h-full justify-center">
                        <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-2xl flex items-center justify-center mb-6">
                            <IconLayoutDashboard className="text-orange-400" size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">One-Screen Dashboard</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Managers get a complete, real-time overview of project health without scrolling through endless group chats. Spot bottlenecks instantly.
                        </p>
                    </div>
                    
                    {/* Abstract Dashboard UI Mockup */}
                    <div className="mt-10 md:mt-0 md:absolute md:right-[-30px] md:top-1/2 md:-translate-y-1/2 w-full md:w-[450px] bg-[#0F172A] border border-slate-700 rounded-2xl p-5 shadow-2xl transform md:-rotate-2 group-hover:rotate-0 transition-transform duration-500">
                        <div className="flex gap-2 mb-5 border-b border-slate-800 pb-4">
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-12 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50">
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Sarah+J&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-32 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider">Safe</div>
                            </div>
                            <div className="h-12 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Mike+Ross&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-40 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider animate-pulse">Blocker</div>
                            </div>
                            <div className="h-12 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50">
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Alex+K&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-24 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider">Safe</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Small Box - No Meetings */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center">
                            <IconClockOff className="text-rose-500" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Zero Endless<br/>Meetings</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">Say goodbye to hour-long chat drama. Save your time and focus entirely on building great things.</p>
                </div>

                {/* Small Box - Setup */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                            <IconRocket className="text-indigo-500" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">5-Minute<br/>Setup</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">From signing up to performing your first sync takes less than 5 minutes. Truly plug-and-play.</p>
                </div>
                
                {/* Small Box - Realtime */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#10B981]/10 rounded-2xl flex items-center justify-center">
                            <IconBrandWechat className="text-[#10B981]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">In-App<br/>Realtime Chat</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">Lightning fast real-time integration powered by Laravel WebSockets for seamless collaboration.</p>
                </div>
            </div>
        </div>
    );
}
