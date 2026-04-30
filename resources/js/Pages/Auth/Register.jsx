import React, { useEffect, useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Antigravity from '@/Components/Antigravity';

export default function Register() {
    const [role, setRole] = useState('employee'); // 'employee' | 'manager'
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const positionRoles = [
        "Frontend Developer", "Backend Developer", "Fullstack Developer", 
        "UI/UX Designer", "Product Manager", "QA Engineer", 
        "Data Analyst", "Marketing", "Other"
    ];

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'employee',
        invitation_code: '',
        position: '',
        company_name: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update role in form data when tab changes
    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        setData('role', selectedRole);
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex bg-[#FFFFFF] font-sans text-[#0F172A]">
            <Head title="Register" />
            
            {/* Left Side: Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#111827] p-8 flex-col justify-between overflow-hidden">
                {/* Antigravity Background */}
                <div className="absolute inset-0 z-0">
                    <Antigravity
                        count={150}
                        magnetRadius={14}
                        ringRadius={11}
                        waveSpeed={0.9}
                        waveAmplitude={0}
                        particleSize={0.8}
                        lerpSpeed={0.05}
                        color="#10B981"
                        autoAnimate={true}
                        particleVariance={0}
                        fieldStrength={9.4}
                    />
                </div>

                {/* Geometric Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-10 z-0 pointer-events-none" 
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px)' }}
                ></div>
                
                <div className="relative z-10 flex items-center">
                    <img src="/img/logo/logo-utama-dark.svg" alt="briefly logo" className="h-8 w-auto" />
                </div>

                <div className="relative z-10 text-white w-full max-w-lg">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                            <span className="text-xs font-medium text-emerald-50 tracking-wide uppercase">Daily Stand-up Bot</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 leading-tight text-white">
                            {role === 'employee' 
                                ? 'Synchronize your daily work in seconds.' 
                                : 'Manage your team effortlessly.'}
                        </h2>
                        <p className="text-emerald-100/90 text-sm leading-relaxed">
                            {role === 'employee'
                                ? 'Join briefly to keep your team aligned without the endless meetings. Experience the fastest way to report progress and unblock tasks.'
                                : 'Create your workspace and get a bird\'s-eye view of your entire team\'s progress without micromanaging.'}
                        </p>
                    </div>
                </div>

                <div className="relative z-10 text-emerald-100/60 text-xs">
                    &copy; 2026 briefly. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="w-full max-w-sm space-y-5 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0F172A]">Create Your Account</h2>
                        <p className="mt-1 text-xs text-slate-500">Choose your role and get started with briefly.</p>
                    </div>

                    {/* Role Selection Tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('employee')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                                role === 'employee' 
                                    ? 'bg-white text-[#10B981] shadow-sm ring-1 ring-slate-200/50' 
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('manager')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                                role === 'manager' 
                                    ? 'bg-white text-[#10B981] shadow-sm ring-1 ring-slate-200/50' 
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Manager
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-3">
                        <div>
                            <label htmlFor="name" className="block text-xs font-medium text-[#0F172A]">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-[#0F172A]">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Vertically Stacked Password Fields */}
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-[#0F172A]">Password</label>
                                <div className="relative mt-1">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
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

                            <div>
                                <label htmlFor="password_confirmation" className="block text-xs font-medium text-[#0F172A]">Confirm Password</label>
                                <div className="relative mt-1">
                                    <input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-[#10B981] transition-colors focus:outline-none"
                                    >
                                        {showConfirmPassword ? (
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
                            </div>
                        </div>

                        {/* Employee Specific Fields */}
                        <div className={`space-y-3 transition-all duration-300 ${role === 'employee' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                            <div>
                                <label htmlFor="invitation_code" className="block text-xs font-medium text-[#0F172A]">Company Invitation Code</label>
                                <input
                                    id="invitation_code"
                                    name="invitation_code"
                                    value={data.invitation_code}
                                    className="mt-1 block w-full px-3 py-2 bg-emerald-50/50 border border-[#10B981]/40 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none placeholder:text-emerald-700/40"
                                    placeholder="e.g. BRF-2026-XYZ"
                                    onChange={(e) => setData('invitation_code', e.target.value)}
                                    required={role === 'employee'}
                                />
                                {errors.invitation_code && <p className="mt-1 text-xs text-red-500">{errors.invitation_code}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#0F172A]">Your Position</label>
                                <div className="relative mt-1" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`flex w-full items-center justify-between px-3 py-2 bg-white border ${isDropdownOpen ? 'border-[#10B981] ring-1 ring-[#10B981]' : 'border-slate-200'} rounded-lg text-left text-sm text-[#0F172A] focus:outline-none transition-all`}
                                    >
                                        <span className={data.position ? 'text-[#0F172A]' : 'text-slate-400'}>
                                            {data.position || 'Select your role'}
                                        </span>
                                        <svg className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Custom Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden py-1 max-h-40 overflow-y-auto custom-scrollbar">
                                            {positionRoles.map((roleOpt) => (
                                                <button
                                                    key={roleOpt}
                                                    type="button"
                                                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                                        data.position === roleOpt 
                                                            ? 'bg-emerald-50 text-[#10B981] font-medium' 
                                                            : 'text-[#0F172A] hover:bg-slate-50 hover:text-[#10B981]'
                                                    }`}
                                                    onClick={() => {
                                                        setData('position', roleOpt);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {roleOpt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <input 
                                        type="hidden" 
                                        name="position" 
                                        value={data.position} 
                                        required={role === 'employee'} 
                                    />
                                </div>
                                {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                            </div>
                        </div>

                        {/* Manager Specific Fields */}
                        <div className={`space-y-3 transition-all duration-300 ${role === 'manager' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                            <div>
                                <label htmlFor="company_name" className="block text-xs font-medium text-[#0F172A]">Company Name</label>
                                <input
                                    id="company_name"
                                    name="company_name"
                                    value={data.company_name}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    placeholder="Your organization name"
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    required={role === 'manager'}
                                />
                                {errors.company_name && <p className="mt-1 text-xs text-red-500">{errors.company_name}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 px-4 bg-[#000000] hover:bg-black/90 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center mt-5 shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                role === 'employee' ? 'Join your workspace' : 'Create Workspace'
                            )}
                        </button>
                    </form>

                    <div className="mt-5 text-center border-t border-slate-100 pt-5">
                        <p className="text-xs text-slate-500">
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
