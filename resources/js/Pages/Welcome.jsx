import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Briefly" />
            
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
                            <a className="text-[#10B981] border-b-2 border-[#10B981] pb-1" href="#">Docs</a>
                            <a className="text-slate-500 hover:text-slate-900 transition-colors duration-200" href="#">Components</a>
                            <a className="text-slate-500 hover:text-slate-900 transition-colors duration-200" href="#">Ecosystem</a>
                            <a className="text-slate-500 hover:text-slate-900 transition-colors duration-200" href="#">Community</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-slate-500 hover:text-slate-900 px-4 py-2 transition-colors">Log In</Link>
                                <Link href={route('register')} className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold active:scale-[0.98] transition-transform shadow-sm">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                <main className="pt-16">
                    {/* Hero Section */}
                    <section className="bg-white relative overflow-hidden">
                        <div className="max-w-wide mx-auto px-6 lg:px-20 pt-24 md:pt-32 pb-48 md:pb-64 flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">v2.0 NOW LIVE</span>
                            <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.05] text-[#0F172A] max-w-4xl mb-8 tracking-tight">
                                Daily Stand-ups, <br/>without the chaos.
                            </h1>
                            <p className="text-lg text-[#565e74] max-w-2xl mb-12 leading-relaxed">
                                Briefly automates status reports, tracks blockers in real-time, and integrates directly with your engineering workflow. No more hour-long meetings.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                                <Link href={route('register')} className="bg-[#10B981] text-white font-bold px-10 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-200 flex items-center justify-center">
                                    Start for Free
                                </Link>
                                <button className="grid-border text-[#0F172A] font-bold px-10 py-4 rounded-lg text-lg hover:bg-slate-50 transition-colors bg-white">
                                    Book a Demo
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
                                            <h3 className="text-2xl font-bold text-[#0F172A]">Active Stand-up</h3>
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
                                                        <p className="text-sm text-slate-500">Refactoring UI components</p>
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
                                                        <p className="text-sm text-slate-500">API Authentication delay</p>
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
                                                        <p className="text-sm text-slate-500">Writing documentation</p>
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
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Instant Sync</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Synchronize stand-ups across Slack, Teams, and Discord automatically.</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Velocity Metrics</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Track team health and project blockers with AI-driven analytics dashboards.</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Enterprise Security</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">SOC2 compliant data handling with end-to-end encryption by default.</p>
                            </div>
                            <div className="grid-border lg:border-l-0 p-10 lg:p-16 hover:bg-slate-50 transition-colors group">
                                <svg className="text-[#10B981] w-8 h-8 mb-8 group-hover:scale-110 transition-transform block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                <h4 className="font-bold text-xl mb-4 text-[#0F172A]">Git Integration</h4>
                                <p className="text-base text-[#565e74] leading-relaxed">Link pull requests and commits directly to daily status updates.</p>
                            </div>
                        </div>
                    </section>

                    {/* Developer Section (Terminal) */}
                    <section className="grid-border-b bg-[#0F172A] py-24 md:py-32 px-6 lg:px-20">
                        <div className="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div>
                                <h2 className="font-bold text-[36px] md:text-[42px] text-white mb-8 leading-tight">Built for Developers</h2>
                                <p className="text-slate-400 mb-10 text-lg leading-relaxed">Interact with Briefly from your favorite shell. Script your updates, manage your blockers, and view team status without leaving the terminal.</p>
                                <ul className="space-y-5 text-slate-300">
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Open-source CLI tool
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        GraphQL and REST APIs
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Webhook support for custom flows
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-slate-700 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]">
                                <div className="bg-[#1e293b] px-5 py-3 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                    <span className="text-[11px] text-slate-400 ml-4 font-mono uppercase tracking-widest">zsh — briefly</span>
                                </div>
                                <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                                    <div className="flex gap-4 mb-3">
                                        <span className="text-slate-500">$</span>
                                        <span className="text-emerald-400">briefly</span>
                                        <span className="text-white">login</span>
                                    </div>
                                    <div className="text-slate-400 mb-6 ml-6 whitespace-nowrap">Authenticating with GitHub... Success.</div>
                                    
                                    <div className="flex gap-4 mb-3">
                                        <span className="text-slate-500">$</span>
                                        <span className="text-emerald-400">briefly</span>
                                        <span className="text-white">status</span>
                                        <span className="text-emerald-400">--blocker</span>
                                        <span className="text-slate-400">"CI/CD pipeline failing"</span>
                                    </div>
                                    <div className="text-slate-400 mb-6 ml-6 whitespace-nowrap">Update posted to #engineering-sync.</div>
                                    
                                    <div className="flex gap-4">
                                        <span className="text-slate-500">$</span>
                                        <span className="text-emerald-400">briefly</span>
                                        <span className="text-white">ls</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-6 ml-6 text-slate-500 border-t border-slate-800 pt-6 min-w-[300px]">
                                        <span>USER</span>
                                        <span>STATUS</span>
                                        <span>TIME</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-3 ml-6 min-w-[300px]">
                                        <span className="text-white">jordan</span>
                                        <span className="text-red-400">BLOCKED</span>
                                        <span className="text-slate-500">2m ago</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-3 ml-6 min-w-[300px]">
                                        <span className="text-white">alex</span>
                                        <span className="text-emerald-400">SAFE</span>
                                        <span className="text-slate-500">14m ago</span>
                                    </div>
                                    <div className="mt-8 flex gap-4">
                                        <span className="text-slate-500">$</span>
                                        <span className="w-2 h-5 bg-[#10B981] animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="py-24 md:py-32 px-6 lg:px-20 bg-white">
                        <div className="max-w-wide mx-auto">
                            <div className="text-center mb-16 md:mb-20">
                                <h2 className="font-bold text-3xl md:text-4xl text-[#0F172A] mb-6">Simple, transparent pricing.</h2>
                                <p className="text-[#565e74] text-lg">Start free, upgrade when your team grows.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden grid-border shadow-sm">
                                {/* Free */}
                                <div className="p-8 md:p-12 flex flex-col grid-border-r md:border-b-0 border-b">
                                    <div className="mb-10">
                                        <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Free</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-[#0F172A]">$0</span>
                                            <span className="text-slate-500">/mo</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-5 mb-12 flex-grow">
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Up to 10 users
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            7-day history
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Slack integration
                                        </li>
                                    </ul>
                                    <button className="grid-border w-full py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">Start Free</button>
                                </div>
                                {/* Pro */}
                                <div className="p-8 md:p-12 flex flex-col grid-border-r md:border-b-0 border-b bg-slate-50/50 relative">
                                    <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[10px] font-black px-5 py-1.5 rounded-bl">MOST POPULAR</div>
                                    <div className="mb-10">
                                        <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Pro</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-[#0F172A]">$12</span>
                                            <span className="text-slate-500">/user/mo</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-5 mb-12 flex-grow">
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Unlimited users
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Unlimited history
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Custom dashboards
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Priority support
                                        </li>
                                    </ul>
                                    <button className="bg-[#10B981] text-white w-full py-4 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-100">Go Pro</button>
                                </div>
                                {/* Enterprise */}
                                <div className="p-8 md:p-12 flex flex-col">
                                    <div className="mb-10">
                                        <h3 className="font-bold text-xl mb-3 text-[#0F172A]">Enterprise</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-[#0F172A]">Custom</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-5 mb-12 flex-grow">
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Dedicated instance
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            SSO &amp; SAML
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            SLA guarantees
                                        </li>
                                        <li className="flex items-center gap-4 text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            Account manager
                                        </li>
                                    </ul>
                                    <button className="grid-border w-full py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">Contact Sales</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-slate-100 bg-white text-xs tracking-normal text-slate-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 px-6 lg:px-20 py-20 max-w-wide mx-auto">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <img src="/img/logo/logo-utama-dark.svg" alt="Briefly" className="h-6 w-auto block dark:hidden" />
                                <span className="text-xl font-black tracking-tighter text-[#0F172A] hidden">Briefly</span>
                            </div>
                            <p className="mb-8 max-w-xs text-sm leading-relaxed">© 2026 Briefly. High-velocity developer experience. Empowering teams to communicate faster and build better.</p>
                            <div className="flex gap-6">
                                <svg className="w-5 h-5 text-slate-400 hover:text-[#10B981] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                <svg className="w-5 h-5 text-slate-400 hover:text-[#10B981] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                <svg className="w-5 h-5 text-slate-400 hover:text-[#10B981] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px]">Product</h5>
                            <ul className="space-y-4">
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Documentation</a></li>
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Changelog</a></li>
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px]">Resources</h5>
                            <ul className="space-y-4">
                                <li><a className="hover:text-slate-900 transition-colors" href="#">GitHub</a></li>
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Discord</a></li>
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Twitter</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px]">Legal</h5>
                            <ul className="space-y-4">
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Privacy Policy</a></li>
                                <li><a className="hover:text-slate-900 transition-colors" href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
