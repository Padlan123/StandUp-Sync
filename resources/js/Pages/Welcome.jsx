import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GradualBlur from '@/Components/GradualBlur';

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
                <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-20 h-16 text-sm font-medium tracking-tight">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2">
                            {/* Logo */}
                            <img src="/img/logo/logo-utama-dark.svg" alt="Briefly" className="h-6 w-auto block dark:hidden" />
                        </div>
                        <div className="hidden md:flex gap-8">
                            <a className="text-[#10B981] border-b-2 border-[#10B981] pb-1" href="#">Features</a>
                            <a className="text-slate-500 hover:text-slate-900 transition-colors duration-200" href="#">How it Works</a>
                            <a className="text-slate-500 hover:text-slate-900 transition-colors duration-200" href="#">Pricing</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                My Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-slate-500 hover:text-slate-900 px-4 py-2 transition-colors hidden sm:block">Log In</Link>
                                <Link href={route('register')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold active:scale-[0.98] transition-transform shadow-sm">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                <main className="pt-16">
                    {/* Hero Section */}
                    <section className="bg-white relative overflow-hidden">
                        <div className="max-w-wide mx-auto px-6 lg:px-20 pt-24 md:pt-32 pb-48 md:pb-64 flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">Say Goodbye to Hour-Long Meetings 👋</span>
                            <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.05] text-[#0F172A] max-w-4xl mb-8 tracking-tight">
                                Daily Team Syncs, <br/>Without the Chat Drama.
                            </h1>
                            <p className="text-lg text-[#565e74] max-w-2xl mb-12 leading-relaxed">
                                Briefly transforms messy daily check-ins on WhatsApp or Telegram into structured data. Let our <strong>SyncBot</strong> chase progress reports, while your team focuses on building great things.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                                <Link href={route('register')} className="bg-[#10B981] text-white font-bold px-10 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-200 flex items-center justify-center">
                                    Try Briefly for Free
                                </Link>
                                <button className="grid-border text-[#0F172A] font-bold px-10 py-4 rounded-lg text-lg hover:bg-slate-50 transition-colors bg-white">
                                    See How It Works
                                </button>
                            </div>
                        </div>

                        {/* Overlapping Mockup */}
                        <div className="max-w-wide mx-auto px-6 lg:px-20 -mt-32 md:-mt-48 relative z-10">
                            <div className="grid-border bg-white rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)]">
                                {/* Top Bar */}
                                <div className="grid-border-b h-14 flex items-center justify-between px-6 bg-white">
                                    <div className="flex gap-2">
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full">briefly.app/dashboard</div>
                                    <div className="w-10"></div>
                                </div>
                                {/* Dashboard Content */}
                                <div className="flex flex-col md:flex-row min-h-[600px]">
                                    <div className="w-full md:w-72 grid-border-r p-8 hidden md:block bg-slate-50/30">
                                        <div className="space-y-8">
                                            <div className="h-5 w-28 bg-slate-200/60 rounded-lg"></div>
                                            <div className="space-y-4">
                                                <div className="h-3.5 w-full bg-slate-100 rounded"></div>
                                                <div className="h-3.5 w-4/5 bg-slate-100 rounded"></div>
                                                <div className="h-3.5 w-full bg-slate-200 rounded"></div>
                                                <div className="h-3.5 w-2/3 bg-slate-100 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8 lg:p-14">
                                        <div className="flex items-center justify-between mb-12">
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#0F172A]">Today's Project Health</h3>
                                                <p className="text-sm text-slate-500 mt-1">Team status automatically extracted from chat.</p>
                                            </div>
                                            <div className="flex -space-x-3">
                                                <img alt="avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=Alex+Rivera&background=random" />
                                                <img alt="avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=Jordan+Smith&background=random" />
                                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+4</div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="grid-border rounded-xl p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-default">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-base text-[#0F172A]">Alex Rivera</p>
                                                        <p className="text-sm text-slate-500">Finalizing UI authentication flow.</p>
                                                    </div>
                                                </div>
                                                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Safe</span>
                                            </div>
                                            
                                            <div className="grid-border rounded-xl p-6 flex items-center justify-between border-red-100 bg-red-50/30 hover:bg-red-50/50 transition-all cursor-default">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-base text-[#0F172A]">Jordan Smith</p>
                                                        <p className="text-sm text-slate-500">Blocked by CORS issues on the API Gateway.</p>
                                                    </div>
                                                </div>
                                                <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Blocker</span>
                                            </div>

                                            <div className="grid-border rounded-xl p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-default">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-base text-[#0F172A]">Sarah Chen</p>
                                                        <p className="text-sm text-slate-500">Writing the system documentation.</p>
                                                    </div>
                                                </div>
                                                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Safe</span>
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
                <footer className="w-full border-t border-slate-100 bg-white text-xs tracking-normal text-slate-500 pb-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-20 py-10 max-w-wide mx-auto">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img src="/img/logo/logo-utama-dark.svg" alt="Briefly" className="h-6 w-auto block dark:hidden" />
                        </div>
                        <p className="text-sm">© 2026 Briefly. Built with Laravel 11, React & Inertia.js.</p>
                    </div>
                </footer>
            </div>
            
            <GradualBlur
                target="page"
                position="bottom"
                height="8rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential={true}
                opacity={1}
                zIndex={40}
            />
        </>
    );
}
