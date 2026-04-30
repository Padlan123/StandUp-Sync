import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

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
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-[#10B981] to-[#064E3B] p-12 flex-col justify-between overflow-hidden">
                {/* Geometric Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px)' }}
                ></div>
                
                <div className="relative z-10 flex items-center gap-3">
                    {/* Logo briefly */}
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg">
                        <span className="text-[#10B981] font-bold text-2xl">b</span>
                    </div>
                    <span className="text-white font-bold text-2xl tracking-tight">briefly</span>
                </div>

                <div className="relative z-10 text-white max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Hello briefly Team! 👋</h1>
                    <p className="text-lg text-emerald-50/90 leading-relaxed">
                        Turn your daily chaos into synchronized progress. Save time, work better.
                    </p>
                </div>

                <div className="relative z-10 text-emerald-100/60 text-sm">
                    &copy; 2026 briefly. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-sm space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Welcome Back</h2>
                        <p className="mt-2 text-sm text-slate-500">Please sign in to your account.</p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-[#10B981]">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-[#0F172A]">Password</label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-[#10B981] hover:underline"
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
                                    className="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none pr-12"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-[#10B981] transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    className="w-4 h-4 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981] transition-colors"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-slate-600 group-hover:text-[#0F172A] transition-colors">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3.5 px-4 bg-[#000000] hover:bg-black/90 text-white font-medium rounded-lg transition-all flex items-center justify-center shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Login Now'
                            )}
                        </button>
                    </form>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-[#FFFFFF] text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-6 w-full flex items-center justify-center px-4 py-3.5 border border-slate-200 rounded-lg bg-white text-[#0F172A] font-medium hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Login with Google
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="font-semibold text-[#10B981] hover:underline">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
