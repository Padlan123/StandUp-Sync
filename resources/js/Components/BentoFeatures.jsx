import React from 'react';
import { 
    IconRobot, IconMessage, IconLayoutDashboard, 
    IconBuilding, IconClockOff, IconRocket, IconBrandWechat,
    IconBrandSvelte, IconBrandReact, IconBrandVue
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const GridSquare = ({ position }) => (
    <div className={`absolute w-2 h-2 bg-white border border-slate-300 z-20 ${position}`} />
);

export default function BentoFeatures() {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">Platform Features</span>
                <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Elevate your team syncs<br/>with the modern stand-up.
                </h2>
                <p className="mt-6 text-xl text-slate-500">
                    Briefly is packed with intelligent tools designed to make daily reporting effortless, organized, and transparent for everyone on your team.
                </p>
            </div>

            {/* Seamless Grid Wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-slate-200 relative bg-white mx-auto">
                
                {/* Large Box - Auto SyncBot */}
                <div className="md:col-span-2 bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative group overflow-hidden flex flex-col justify-between">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-[#10B981]/10 flex items-center justify-center mb-6 border border-[#10B981]/20">
                            <IconRobot className="text-[#10B981]" size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Automated Daily SyncBot</h3>
                        <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                            Our intelligent bot automatically reminds your team at 09:00 AM every single day. No more manual chasing or forgotten updates. Let the system do the heavy lifting.
                        </p>
                    </div>

                    {/* Marquee Chat (No background, just profile & text) */}
                    <div className="relative w-full overflow-hidden whitespace-nowrap mt-16 flex items-center">
                        <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-white group-hover:from-slate-50 to-transparent z-10 transition-colors duration-300"></div>
                        <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-white group-hover:from-slate-50 to-transparent z-10 transition-colors duration-300"></div>
                        <motion.div 
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                            className="flex gap-16 inline-flex items-center"
                        >
                            {/* Duplicate array items for seamless looping */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                                        <IconRobot size={24} />
                                    </div>
                                    <div className="text-slate-800 font-semibold text-xl tracking-tight">
                                        Good morning team! 👋 What did you accomplish yesterday? Any blockers?
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Medium Box - Smart Chat Parsing */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative flex flex-col">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                        <IconMessage className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Smart Chat Parsing</h3>
                    <p className="text-slate-500 leading-relaxed flex-1">
                        Transform messy chat conversations into structured data. Our engine instantly detects statuses from natural replies.
                    </p>
                    <div className="mt-8 flex gap-3 flex-wrap">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-black tracking-widest shadow-sm">SAFE</span>
                        <span className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-black tracking-widest shadow-sm">BLOCKER</span>
                    </div>
                </div>

                {/* Medium Box - Tenant Isolation */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="w-14 h-14 bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                        <IconBuilding className="text-purple-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Multi-Tenant Isolation</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Manage multiple companies or teams in one system securely. Complete data isolation with unique Workspaces.
                    </p>
                </div>

                {/* Large Box - Dashboard (Matching the reference image layout) */}
                <div className="md:col-span-2 bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 overflow-hidden relative flex flex-col md:flex-row items-center">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="relative z-10 w-full md:w-1/2 flex flex-col h-full justify-center">
                        <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                            <IconLayoutDashboard className="text-orange-500" size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">One-Screen Dashboard</h3>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Managers get a complete, real-time overview of project health without scrolling through endless group chats. Spot bottlenecks instantly.
                        </p>
                    </div>
                    
                    {/* Dashboard UI Mockup Tucked in Corner */}
                    <div className="mt-12 md:mt-0 md:absolute md:-bottom-6 md:-right-6 w-full md:w-[450px] bg-[#0F172A] border border-slate-700 rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                        <div className="flex gap-2 mb-5 border-b border-slate-800 pb-4">
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-14 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50">
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Sarah+J&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-32 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider">Safe</div>
                            </div>
                            <div className="h-14 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Mike+Ross&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-40 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider animate-pulse">Blocker</div>
                            </div>
                            <div className="h-14 bg-[#1e293b] rounded-xl flex items-center px-4 gap-4 border border-slate-700/50">
                                <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Alex+K&background=475569&color=fff" alt="" /></div>
                                <div className="h-2 w-24 bg-slate-600 rounded"></div>
                                <div className="ml-auto px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider">Safe</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Small Box - No Meetings */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col justify-center relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                            <IconClockOff className="text-rose-500" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Zero Endless<br/>Meetings</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">Say goodbye to hour-long chat drama. Save your time and focus entirely on building great things.</p>
                </div>

                {/* Small Box - Setup */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col justify-center relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <IconRocket className="text-indigo-500" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">5-Minute<br/>Setup</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">From signing up to performing your first sync takes less than 5 minutes. Truly plug-and-play.</p>
                </div>
                
                {/* Small Box - Realtime */}
                <div className="bg-white border-r border-b border-slate-200 p-10 hover:bg-slate-50 transition-colors duration-300 flex flex-col justify-center relative">
                    <GridSquare position="-top-1 -left-1" />
                    <GridSquare position="-bottom-1 -right-1" />
                    <GridSquare position="-top-1 -right-1" />
                    <GridSquare position="-bottom-1 -left-1" />
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
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
