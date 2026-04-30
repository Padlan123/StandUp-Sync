import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [displayedTitle, setDisplayedTitle] = useState("");
    const [displayedDesc, setDisplayedDesc] = useState("");
    const [activeCursor, setActiveCursor] = useState('title'); // 'title' | 'desc'
    
    const fullTitle = "Hello briefly Team! 👋";
    const fullDesc = "Turn your daily chaos into synchronized progress. Save time, work better.";

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        let titleIndex = 0;
        let descIndex = 0;
        let phase = 'typing_title';
        let timerId;
        let isCancelled = false;

        const tick = () => {
            if (isCancelled) return;

            if (phase === 'typing_title') {
                setActiveCursor('title');
                if (titleIndex < fullTitle.length) {
                    titleIndex++;
                    setDisplayedTitle(fullTitle.substring(0, titleIndex));
                    timerId = setTimeout(tick, 50);
                } else {
                    phase = 'typing_desc';
                    timerId = setTimeout(tick, 200); // small pause before typing description
                }
            } else if (phase === 'typing_desc') {
                setActiveCursor('desc');
                if (descIndex < fullDesc.length) {
                    descIndex++;
                    setDisplayedDesc(fullDesc.substring(0, descIndex));
                    timerId = setTimeout(tick, 30); // description types slightly faster
                } else {
                    phase = 'waiting';
                    setActiveCursor('desc');
                    timerId = setTimeout(() => {
                        phase = 'deleting_desc';
                        tick();
                    }, 4000); // 4 seconds reading time
                }
            } else if (phase === 'deleting_desc') {
                setActiveCursor('desc');
                if (descIndex > 0) {
                    descIndex--;
                    setDisplayedDesc(fullDesc.substring(0, descIndex));
                    timerId = setTimeout(tick, 15); // fast delete
                } else {
                    phase = 'deleting_title';
                    timerId = setTimeout(tick, 15);
                }
            } else if (phase === 'deleting_title') {
                setActiveCursor('title');
                if (titleIndex > 0) {
                    titleIndex--;
                    setDisplayedTitle(fullTitle.substring(0, titleIndex));
                    timerId = setTimeout(tick, 15);
                } else {
                    phase = 'reset_wait';
                    setActiveCursor('title');
                    timerId = setTimeout(() => {
                        phase = 'typing_title';
                        tick();
                    }, 1000); // 1 sec pause before restart
                }
            }
        };

        // Start animation
        timerId = setTimeout(tick, 500);

        return () => {
            isCancelled = true;
            clearTimeout(timerId);
        };
    }, []);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex bg-[#FFFFFF] font-sans text-[#0F172A]">
            <Head title="Log in" />
            
            {/* Left Side: Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#111827] p-8 flex-col justify-between overflow-hidden">
                {/* Geometric Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px)' }}
                ></div>
                
                <div className="relative z-10 flex items-center">
                    <img src="/img/logo/logo-utama-dark.svg" alt="briefly logo" className="h-8 w-auto" />
                </div>

                <div className="relative z-10 text-white max-w-lg min-h-[140px]">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {displayedTitle}
                        <span className={`animate-pulse ${activeCursor === 'title' ? 'inline-block' : 'hidden'}`}>|</span>
                    </h1>
                    <p className="text-sm text-emerald-50/90 leading-relaxed min-h-[40px]">
                        {displayedDesc}
                        <span className={`animate-pulse ${activeCursor === 'desc' ? 'inline-block' : 'hidden'}`}>|</span>
                    </p>
                </div>

                <div className="relative z-10 text-emerald-100/60 text-xs">
                    &copy; 2026 briefly. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-sm space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0F172A]">Welcome Back</h2>
                        <p className="mt-1 text-xs text-slate-500">Please sign in to your account.</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-[#0F172A] mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-xs font-medium text-[#0F172A]">Password</label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-medium text-[#10B981] hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none pr-10"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-[#10B981] transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 bg-white border border-slate-300 rounded peer-checked:bg-[#10B981] peer-checked:border-[#10B981] transition-colors flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="ml-2 text-xs text-slate-600">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 px-4 bg-[#000000] hover:bg-black/90 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center mt-4 shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center border-t border-slate-100 pt-6">
                        <p className="text-xs text-slate-500">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="font-semibold text-[#10B981] hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
