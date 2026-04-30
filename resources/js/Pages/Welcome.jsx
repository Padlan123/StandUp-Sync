import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MagicRings from '@/Components/MagicRings';
import BorderGlow from '@/Components/BorderGlow';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Briefly - Daily Stand-ups, Without the Endless Meetings" />
            
            <style dangerouslySetInnerHTML={{__html: `
                .grid-border { border: 1px solid #E2E8F0; }
                .grid-border-b { border-bottom: 1px solid #E2E8F0; }
                .grid-border-r { border-right: 1px solid #E2E8F0; }
                .max-w-wide { max-width: 1440px; }
            `}} />

            <div className="antialiased font-sans text-slate-800 bg-white selection:bg-[#10B981] selection:text-white">
                {/* TopNavBar */}
                <nav className="fixed top-0 w-full z-50 border-b border-[#1e293b] bg-[#0F172A] flex items-center justify-between px-6 lg:px-20 h-16 text-sm font-medium tracking-tight">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2">
                            {/* Logo */}
                            <img src="/img/logo/logo-utama-dark.svg" alt="Briefly" className="h-6 w-auto block dark:hidden" />
                        </div>
                        <div className="hidden md:flex gap-8">
                            <a className="text-[#10B981] border-b-2 border-[#10B981] pb-1" href="#">Features</a>
                            <a className="text-slate-400 hover:text-white transition-colors duration-200" href="#">How it Works</a>
                            <a className="text-slate-400 hover:text-white transition-colors duration-200" href="#">Pricing</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                My Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-slate-400 hover:text-white px-4 py-2 transition-colors hidden sm:block">Log In</Link>
                                <Link href={route('register')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold active:scale-[0.98] transition-transform shadow-sm border border-[#10B981]/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                <main className="pt-16">
                    {/* Hero Section */}
                    <section className="bg-[#0F172A] relative overflow-hidden">
                        {/* Magic Rings Background */}
                        <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
                            <MagicRings
                                color="#38bdf8"
                                colorTwo="#10B981"
                                ringCount={5}
                                speed={0.8}
                                attenuation={8}
                                lineThickness={2}
                                baseRadius={0.15}
                                radiusStep={0.12}
                                scaleRate={0.05}
                                opacity={1}
                                blur={1}
                                noiseAmount={0.05}
                                rotation={0}
                                ringGap={1.2}
                                fadeIn={0.7}
                                fadeOut={0.5}
                                followMouse={true}
                                mouseInfluence={0.1}
                                hoverScale={1.1}
                                parallax={0.03}
                                clickBurst={true}
                            />
                        </div>
                        <div className="max-w-wide mx-auto px-6 lg:px-20 pt-24 md:pt-32 pb-48 md:pb-64 flex flex-col items-center text-center relative z-10 pointer-events-none">
                            <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase pointer-events-auto">Say Goodbye to Hour-Long Meetings 👋</span>
                            <h1 className="font-bold text-[56px] md:text-[72px] lg:text-[80px] leading-[1.05] text-white max-w-5xl mb-8 tracking-tight pointer-events-auto">
                                Daily Team Syncs, <br/>Without the Chat Drama.
                            </h1>
                            <p className="text-lg text-slate-300 max-w-2xl mb-12 leading-relaxed pointer-events-auto">
                                Briefly transforms messy daily check-ins on WhatsApp or Telegram into structured data. Let our <strong className="text-white">SyncBot</strong> chase progress reports, while your team focuses on building great things.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 mb-12 pointer-events-auto">
                                <BorderGlow
                                    className="rounded-lg"
                                    edgeSensitivity={30}
                                    glowColor="160 84 40"
                                    backgroundColor="transparent"
                                    borderRadius={8}
                                    glowRadius={20}
                                    glowIntensity={1.0}
                                    coneSpread={25}
                                    animated={true}
                                    colors={['#34d399', '#10B981', '#059669']}
                                >
                                    <Link href={route('register')} className="bg-[#10B981] text-white font-bold px-10 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center border border-[#10B981]/50 w-full h-full">
                                        Try Briefly for Free
                                    </Link>
                                </BorderGlow>
                                <button className="border border-slate-700 text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-[#1e293b] transition-colors bg-[#0b1120]">
                                    See How It Works
                                </button>
                            </div>
                        </div>

                        {/* Overlapping Mockup */}
                        <div className="max-w-wide mx-auto px-6 lg:px-20 -mt-32 md:-mt-48 relative z-10">
                            <div className="grid-border bg-[#0F172A] rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] border border-slate-700 flex flex-col">
                                {/* Top Bar */}
                                <div className="h-12 flex items-center justify-between px-6 bg-[#1e293b] border-b border-slate-700">
                                    <div className="flex gap-2">
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-400 bg-[#0F172A] px-4 py-1.5 rounded-full flex items-center gap-2">
                                        <svg className="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                        briefly.app/chat
                                    </div>
                                    <div className="w-10"></div>
                                </div>
                                {/* Chat Content */}
                                <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] bg-[#0b1120]">
                                    {/* Sidebar */}
                                    <div className="w-full md:w-80 border-r border-slate-800 flex-shrink-0 hidden md:flex flex-col bg-[#0F172A]">
                                        <div className="p-4 border-b border-slate-800">
                                            <div className="bg-[#1e293b] rounded-lg px-4 py-2 text-sm text-slate-400 flex items-center gap-2 border border-slate-700">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                Search messages
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto">
                                            <div className="px-4 py-3 bg-[#1e293b]/50 border-l-2 border-[#10B981] cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-slate-200">Briefly SyncBot</h4>
                                                    <span className="text-xs text-slate-500">09:02 AM</span>
                                                </div>
                                                <p className="text-sm text-slate-400 truncate mt-1">Status recorded as Blocker.</p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-[#1e293b]/30 cursor-pointer border-l-2 border-transparent transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-slate-200"># Engineering Team</h4>
                                                    <span className="text-xs text-slate-500">Yesterday</span>
                                                </div>
                                                <p className="text-sm text-slate-400 truncate mt-1">Alex: I'll review the PRs today.</p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-[#1e293b]/30 cursor-pointer border-l-2 border-transparent transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-slate-200"># Marketing</h4>
                                                    <span className="text-xs text-slate-500">Tue</span>
                                                </div>
                                                <p className="text-sm text-slate-400 truncate mt-1">Sarah: Campaign is ready to launch!</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Chat Area */}
                                    <div className="flex-1 flex flex-col relative bg-[#0b1120]">
                                        {/* Chat Header */}
                                        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-[#0F172A]">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                                    </div>
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0F172A] rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-200">Briefly SyncBot</h3>
                                                    <p className="text-xs text-emerald-400">Online</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <svg className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                <svg className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                            </div>
                                        </div>
                                        
                                        {/* Chat Messages */}
                                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                            {/* Date separator */}
                                            <div className="flex justify-center">
                                                <span className="bg-[#1e293b] border border-slate-700 text-slate-400 text-xs px-3 py-1 rounded-full">Today</span>
                                            </div>

                                            {/* Bot Message */}
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-1">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                                </div>
                                                <div className="max-w-[80%]">
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <span className="font-bold text-slate-200 text-sm">SyncBot</span>
                                                        <span className="text-xs text-slate-500">09:00 AM</span>
                                                    </div>
                                                    <div className="bg-[#1e293b] text-slate-300 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed border border-slate-700/50">
                                                        <p className="mb-2">Good morning team! 👋 It's time for our daily sync.</p>
                                                        <p className="mb-1 text-slate-400">Please answer briefly:</p>
                                                        <ul className="list-decimal pl-4 space-y-1 text-slate-400">
                                                            <li>What did you accomplish yesterday?</li>
                                                            <li>What are you working on today?</li>
                                                            <li>Are there any blockers?</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* User Message */}
                                            <div className="flex gap-4 flex-row-reverse">
                                                <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 overflow-hidden mt-1">
                                                    <img src="https://ui-avatars.com/api/?name=Jordan+Smith&background=475569&color=fff" alt="User" />
                                                </div>
                                                <div className="max-w-[80%]">
                                                    <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                                                        <span className="font-bold text-slate-200 text-sm">You</span>
                                                        <span className="text-xs text-slate-500">09:02 AM</span>
                                                    </div>
                                                    <div className="bg-[#10B981] text-white p-4 rounded-2xl rounded-tr-none shadow-[0_4px_15px_rgba(16,185,129,0.2)] text-sm leading-relaxed">
                                                        <p>1. Finished the Auth flow UI.</p>
                                                        <p>2. Integrating the API Gateway today.</p>
                                                        <p>3. Yes, hitting CORS errors on staging. Need help from Alex.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bot Parsing Visualization */}
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-1">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                                </div>
                                                <div className="max-w-[80%] w-full">
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <span className="font-bold text-slate-200 text-sm">SyncBot</span>
                                                        <span className="text-xs text-slate-500">09:02 AM</span>
                                                    </div>
                                                    <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm w-full relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
                                                        <div className="flex items-center gap-3 mb-3 border-b border-slate-700 pb-3">
                                                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                                                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-200">Status automatically parsed</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="bg-[#0b1120] rounded-lg p-3 border border-slate-800">
                                                                <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Status</p>
                                                                <span className="bg-red-500/10 text-red-400 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-red-500/20">Blocker</span>
                                                            </div>
                                                            <div className="bg-[#0b1120] rounded-lg p-3 border border-slate-800">
                                                                <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Mentioned</p>
                                                                <span className="text-sm text-blue-400">@Alex</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                            Synced to Team Dashboard
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Chat Input */}
                                        <div className="p-4 bg-[#0F172A] border-t border-slate-800">
                                            <div className="relative">
                                                <input type="text" placeholder="Type your standup report..." className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all" />
                                                <button className="absolute right-2 top-2 w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                                    <svg className="w-4 h-4 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="bg-white pt-24 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-wide mx-auto px-6 lg:px-0">
                            <div className="grid-border p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Auto-SyncBot 09:00 AM</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Our system automatically reminds the entire team to report every morning at 09:00 AM. No more manual follow-ups.</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Smart Chat Parsing</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Just reply naturally. Our engine smartly extracts the context and flags your status as "Safe" or "Blocker".</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">One-Screen Dashboard</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Managers can instantly see who needs help today from a single dashboard, without endlessly scrolling through group chats.</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Multi-Tenant Isolation</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Create distinct Workspaces with a Unique Company Code. Manage multiple teams centrally with 100% data isolation.</p>
                            </div>
                        </div>
                    </section>

                    {/* Chat UI Section */}
                    <section className="grid-border-b bg-[#0F172A] py-24 md:py-32 px-6 lg:px-20">
                        <div className="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div>
                                <h2 className="font-bold text-[36px] md:text-[42px] text-white mb-8 leading-tight">A Natural Chat Experience</h2>
                                <p className="text-slate-400 mb-10 text-lg leading-relaxed">Briefly is designed to be as simple as replying to a text message. No more complex reporting forms. Let our platform detect blockers directly from your daily conversations.</p>
                                <ul className="space-y-5 text-slate-300">
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Real-time integration via Laravel WebSockets.
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Instant <strong>Blocker / Safe</strong> detection analytics.
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Perfect for teams of all sizes, from Micro-SaaS to Enterprise.
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Mockup Chat */}
                            <div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-slate-700 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] flex flex-col h-[350px]">
                                <div className="bg-[#1e293b] px-5 py-4 flex items-center justify-between border-b border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-bold">SyncBot</h4>
                                            <p className="text-xs text-emerald-400">Online</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 font-sans text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1e293b] flex-shrink-0"></div>
                                        <div className="bg-[#1e293b] text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                            Good morning! What are you working on today? Any blockers?
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 overflow-hidden">
                                            <img src="https://ui-avatars.com/api/?name=Jordan+Smith&background=475569&color=fff" alt="" />
                                        </div>
                                        <div className="bg-[#10B981] text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-md">
                                            I'm working on the API Gateway but hitting CORS errors. I'm stuck, need help from a senior.
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-2">
                                        <div className="w-8 h-8 rounded-full bg-[#1e293b] flex-shrink-0"></div>
                                        <div className="bg-[#1e293b] border border-red-500/30 text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[80%] relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                                            Status recorded as <strong className="text-red-400">Blocker</strong>. Report has been synced to the Manager's Dashboard.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="py-24 md:py-32 px-6 lg:px-20 bg-white text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-bold text-3xl md:text-5xl text-[#0F172A] mb-6 leading-tight">Start reducing meetings today.</h2>
                            <p className="text-[#565e74] text-lg mb-10">Boost your team's transparency and productivity in minutes. From signup to your first sync takes less than 5 minutes.</p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')} className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-200 text-lg">
                                    Get Started for Free
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-slate-100 bg-white text-xs tracking-normal text-slate-500">
                    <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-20 py-10 max-w-wide mx-auto">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img src="/img/logo/logo-utama-dark.svg" alt="Briefly" className="h-6 w-auto block dark:hidden" />
                        </div>
                        <p className="text-sm">© 2026 Briefly. Built with Laravel 11, React & Inertia.js.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
