import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [role, setRole] = useState('employee'); // 'employee' | 'manager'

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
            <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-b from-[#10B981] to-[#064E3B] p-12 flex-col justify-between overflow-hidden">
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

                <div className="relative z-10 text-white w-full max-w-lg">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                            <span className="text-sm font-medium text-emerald-50 tracking-wide uppercase">Daily Stand-up Bot</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-3 leading-tight text-white">
                            {role === 'employee' 
                                ? 'Synchronize your daily work in seconds.' 
                                : 'Manage your team effortlessly.'}
                        </h2>
                        <p className="text-emerald-100/90 text-base leading-relaxed">
                            {role === 'employee'
                                ? 'Join briefly to keep your team aligned without the endless meetings. Experience the fastest way to report progress and unblock tasks.'
                                : 'Create your workspace and get a bird\'s-eye view of your entire team\'s progress without micromanaging.'}
                        </p>
                    </div>
                </div>

                <div className="relative z-10 text-emerald-100/60 text-sm">
                    &copy; 2026 briefly. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 py-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Create Your Account</h2>
                        <p className="mt-2 text-sm text-slate-500">Choose your role and get started with briefly.</p>
                    </div>

                    {/* Role Selection Tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('employee')}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
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
                            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                                role === 'manager' 
                                    ? 'bg-white text-[#10B981] shadow-sm ring-1 ring-slate-200/50' 
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            Manager
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#0F172A]">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1.5 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1.5 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#0F172A]">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1.5 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#0F172A]">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1.5 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Employee Specific Fields */}
                        <div className={`space-y-5 transition-all duration-300 ${role === 'employee' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                            <div>
                                <label htmlFor="invitation_code" className="block text-sm font-medium text-[#0F172A]">Company Invitation Code</label>
                                <input
                                    id="invitation_code"
                                    name="invitation_code"
                                    value={data.invitation_code}
                                    className="mt-1.5 block w-full px-4 py-3 bg-emerald-50/50 border border-[#10B981]/40 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none placeholder:text-emerald-700/40"
                                    placeholder="e.g. BRF-2026-XYZ"
                                    onChange={(e) => setData('invitation_code', e.target.value)}
                                    required={role === 'employee'}
                                />
                                {errors.invitation_code && <p className="mt-1.5 text-sm text-red-500">{errors.invitation_code}</p>}
                            </div>

                            <div>
                                <label htmlFor="position" className="block text-sm font-medium text-[#0F172A]">Your Position</label>
                                <div className="relative mt-1.5">
                                    <select
                                        id="position"
                                        name="position"
                                        value={data.position}
                                        className="appearance-none block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                        onChange={(e) => setData('position', e.target.value)}
                                        required={role === 'employee'}
                                    >
                                        <option value="" disabled>Select your role</option>
                                        <option value="Frontend Developer">Frontend Developer</option>
                                        <option value="Backend Developer">Backend Developer</option>
                                        <option value="Fullstack Developer">Fullstack Developer</option>
                                        <option value="UI/UX Designer">UI/UX Designer</option>
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="QA Engineer">QA Engineer</option>
                                        <option value="Data Analyst">Data Analyst</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.position && <p className="mt-1.5 text-sm text-red-500">{errors.position}</p>}
                            </div>
                        </div>

                        {/* Manager Specific Fields */}
                        <div className={`space-y-5 transition-all duration-300 ${role === 'manager' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                            <div>
                                <label htmlFor="company_name" className="block text-sm font-medium text-[#0F172A]">Company Name</label>
                                <input
                                    id="company_name"
                                    name="company_name"
                                    value={data.company_name}
                                    className="mt-1.5 block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[#0F172A] focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all outline-none"
                                    placeholder="Your organization name"
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    required={role === 'manager'}
                                />
                                {errors.company_name && <p className="mt-1.5 text-sm text-red-500">{errors.company_name}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3.5 px-4 bg-[#000000] hover:bg-black/90 text-white font-medium rounded-lg transition-all flex items-center justify-center mt-8 shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                role === 'employee' ? 'Join your workspace' : 'Create Workspace'
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
