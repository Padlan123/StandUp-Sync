import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex bg-[#FFFFFF] font-sans text-[#0F172A]">
            <Head title="Register" />
            
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

                <div className="relative z-10 text-white max-w-lg w-full">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                            <span className="text-sm font-medium text-emerald-50 tracking-wide uppercase">Daily Stand-up Bot</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-3 leading-tight text-white">Synchronize your daily work in seconds.</h2>
                        <p className="text-emerald-100/90 text-base leading-relaxed">
                            Join briefly to keep your team aligned without the endless meetings. Experience the fastest way to report progress and unblock tasks.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 text-emerald-100/60 text-sm">
                    &copy; 2026 briefly. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 py-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Create Your Account</h2>
                        <p className="mt-2 text-sm text-slate-500">Get started with briefly today.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#0F172A]">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">Work Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#0F172A]">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#0F172A]">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                {errors.password_confirmation && <p className="mt-2 text-sm text-red-500">{errors.password_confirmation}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3.5 px-4 bg-[#000000] hover:bg-black/90 text-white font-medium rounded-lg transition-all flex items-center justify-center mt-6 shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Get Started'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-8">
                        <p className="text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-semibold text-[#10B981] hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
