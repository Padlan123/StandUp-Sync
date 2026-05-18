import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconPlus,
    IconSearch,
    IconHome,
    IconRobot,
    IconUsers,
    IconRadar,
    IconArchive,
    IconSettings,
    IconMessageCircle,
    IconDownload,
    IconLogout,
    IconBuilding,
    IconFileDescription,
    IconX,
    IconCheck,
    IconLoader2,
    IconSparkles,
    IconCopy,
    IconArrowRight,
    IconAlertCircle,
} from '@tabler/icons-react';

import DashboardSidebar from '@/Components/DashboardSidebar';

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step, currentStep, label }) {
    const isCompleted = currentStep > step;
    const isActive = currentStep === step;

    return (
        <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                isCompleted ? 'bg-emerald-500 text-white' :
                isActive ? 'bg-[#0F172A] text-white ring-4 ring-slate-200' :
                'bg-slate-100 text-slate-400'
            }`}>
                {isCompleted ? <IconCheck size={15} stroke={2.5} /> : step}
            </div>
            <span className={`text-sm font-medium hidden sm:block transition-colors duration-300 ${isActive ? 'text-[#0F172A]' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                {label}
            </span>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CreateWorkspace({ auth, flash, groups }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [step, setStep] = useState(1);
    const [copied, setCopied] = useState(false);
    const [previewCode] = useState('BRF-2026-' + Math.random().toString(36).substring(2, 5).toUpperCase());

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        description: '',
    });

    const nameRef = useRef(null);

    useEffect(() => {
        if (step === 1 && nameRef.current) {
            nameRef.current.focus();
        }
    }, [step]);

    const handleNext = (e) => {
        e.preventDefault();
        if (!data.name.trim()) return;
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('create.group'), {
            onSuccess: () => setStep(3),
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(previewCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-screen bg-white font-sans text-[#0F172A] overflow-hidden">
            <Head title="Create Workspace — Briefly" />

            {/* Sidebar */}
            <DashboardSidebar 
                auth={auth} 
                groups={groups || []} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                {/* Mobile header */}
                <header className="h-14 border-b border-slate-200 flex items-center px-6 lg:hidden shrink-0">
                    <button onClick={() => setIsCollapsed(false)} className="mr-4">
                        <IconLayoutSidebarLeftExpand size={20} className="text-slate-500" />
                    </button>
                    <span className="font-semibold text-slate-800">Briefly</span>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <div className="min-h-full flex flex-col items-center justify-center px-4 py-16">
                        <div className="w-full max-w-lg">

                            {/* Back link */}
                            <Link
                                href={route('dashboard.owner')}
                                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
                            >
                                <IconArrowRight size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                                Back to Dashboard
                            </Link>

                            {/* Step indicator */}
                            <div className="flex items-center gap-4 mb-8">
                                <StepIndicator step={1} currentStep={step} label="Workspace Info" />
                                <div className="flex-1 h-px bg-slate-200" />
                                <StepIndicator step={2} currentStep={step} label="Confirm" />
                                <div className="flex-1 h-px bg-slate-200" />
                                <StepIndicator step={3} currentStep={step} label="Done" />
                            </div>

                            {/* Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden">

                                {/* ── STEP 1: Info ── */}
                                {step === 1 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {/* Card header */}
                                        <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                    <IconBuilding size={20} className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h1 className="text-lg font-semibold text-[#0F172A]">Create a Workspace</h1>
                                                    <p className="text-sm text-slate-500">Your team's dedicated sync hub</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleNext} className="px-8 py-6 space-y-5">
                                            {/* Workspace Name */}
                                            <div className="space-y-1.5">
                                                <label htmlFor="workspace-name" className="block text-sm font-medium text-slate-700">
                                                    Workspace Name <span className="text-red-400">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        ref={nameRef}
                                                        id="workspace-name"
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        placeholder="e.g. Engineering Team, Marketing Hub"
                                                        className={`w-full h-11 px-4 text-sm bg-white border rounded-lg outline-none transition-all placeholder:text-slate-400
                                                            ${errors.name
                                                                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                                : 'border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50'
                                                            }`}
                                                    />
                                                    {data.name && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setData('name', '')}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                        >
                                                            <IconX size={15} />
                                                        </button>
                                                    )}
                                                </div>
                                                {errors.name && (
                                                    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                                                        <IconAlertCircle size={13} /> {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-1.5">
                                                <label htmlFor="workspace-desc" className="block text-sm font-medium text-slate-700">
                                                    Description
                                                    <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
                                                </label>
                                                <div className="relative">
                                                    <IconFileDescription size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                                                    <textarea
                                                        id="workspace-desc"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        placeholder="What does this workspace track? (e.g. Sprint progress, design reviews…)"
                                                        rows={3}
                                                        className="w-full px-4 pl-9 pt-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none resize-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                                                    />
                                                </div>
                                            </div>

                                            {/* Info banner */}
                                            <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                                                <IconSparkles size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    After creating, a unique <strong>Invite Code</strong> will be generated. Share it with your team so they can join instantly.
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={!data.name.trim()}
                                                className="w-full h-11 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
                                            >
                                                Continue
                                                <IconArrowRight size={16} />
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* ── STEP 2: Confirm ── */}
                                {step === 2 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                                            <h2 className="text-lg font-semibold text-[#0F172A]">Confirm your workspace</h2>
                                            <p className="text-sm text-slate-500 mt-1">Review the details before creating</p>
                                        </div>

                                        <div className="px-8 py-6 space-y-5">
                                            {/* Preview card */}
                                            <div className="rounded-xl border border-slate-200 overflow-hidden">
                                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                                        {data.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#0F172A]">{data.name}</p>
                                                        <p className="text-xs text-slate-500">Created by {auth.user.name}</p>
                                                    </div>
                                                </div>
                                                {data.description && (
                                                    <div className="px-5 py-3 border-t border-slate-100 bg-white">
                                                        <p className="text-sm text-slate-600">{data.description}</p>
                                                    </div>
                                                )}
                                                <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs text-slate-400 mb-1">Invite Code Preview</p>
                                                        <p className="font-mono text-sm font-semibold text-emerald-600 tracking-widest">{previewCode}</p>
                                                    </div>
                                                    <button
                                                        onClick={handleCopy}
                                                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg"
                                                    >
                                                        {copied ? <IconCheck size={13} className="text-emerald-500" /> : <IconCopy size={13} />}
                                                        {copied ? 'Copied!' : 'Copy'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Flash error */}
                                            {flash?.error && (
                                                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                                                    <IconAlertCircle size={16} />
                                                    {flash.error}
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    disabled={processing}
                                                    className="flex-1 h-11 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                                                >
                                                    Back
                                                </button>
                                                <form onSubmit={handleSubmit} className="flex-1">
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="w-full h-11 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-600 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
                                                    >
                                                        {processing ? (
                                                            <>
                                                                <IconLoader2 size={16} className="animate-spin" />
                                                                Creating…
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconCheck size={16} />
                                                                Create Workspace
                                                            </>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── STEP 3: Success ── */}
                                {step === 3 && (
                                    <div className="animate-in fade-in zoom-in-95 duration-500 px-8 py-12 text-center">
                                        {/* Animated checkmark */}
                                        <div className="relative w-20 h-20 mx-auto mb-6">
                                            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30"></div>
                                            <div className="relative w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                                                <IconCheck size={36} stroke={2.5} className="text-white" />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Workspace Created!</h2>
                                        <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                                            <strong className="text-slate-700">{data.name}</strong> is live. Share the invite code with your team to get started.
                                        </p>

                                        {/* Invite code display */}
                                        <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 mb-8">
                                            <div>
                                                <p className="text-xs text-slate-400 text-left mb-0.5">Invite Code</p>
                                                <p className="font-mono text-base font-bold text-emerald-600 tracking-widest">{previewCode}</p>
                                            </div>
                                            <button
                                                onClick={handleCopy}
                                                className="ml-2 text-slate-400 hover:text-emerald-600 transition-colors"
                                            >
                                                {copied ? <IconCheck size={16} className="text-emerald-500" /> : <IconCopy size={16} />}
                                            </button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Link
                                                href={route('workspace.create')}
                                                onClick={() => { setStep(1); reset(); }}
                                                className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                                            >
                                                Create Another
                                            </Link>
                                            <Link
                                                href={route('dashboard.owner')}
                                                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#10B981] hover:bg-emerald-600 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 justify-center"
                                            >
                                                Go to Dashboard
                                                <IconArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Helper text */}
                            {step !== 3 && (
                                <p className="text-center text-xs text-slate-400 mt-6">
                                    You can manage all workspaces later from{' '}
                                    <Link href="#" className="text-emerald-600 hover:underline">Workspace Settings</Link>.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
