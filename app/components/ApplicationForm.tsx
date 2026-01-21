"use client";

import { useState } from 'react';

export default function ApplicationForm({ schoolName, locations }: { schoolName: string, locations: any[] }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-emerald-100 mx-auto animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Sent</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Thank you for choosing {schoolName || "us"}. Your application has been received. Our admissions team will review the details and contact you via email shortly.
                </p>
                <button 
                    onClick={() => window.location.href = '/'} 
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium">
                    Something went wrong. Please check your connection and try again.
                </div>
            )}

            {/* SECTION 1: CAMPUS SELECTION */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">01</span>
                    <h3 className="text-2xl font-bold text-slate-900">Campus Choice</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-slate-700 ml-1 italic">Which branch are you applying to?</label>
                    <select 
                        name="branch" 
                        required 
                        className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                    >
                        <option value="">Select a Campus Branch</option>
                        {/* Added Safety Check: ensures locations exists before mapping */}
                        {locations?.map((location: any, index: number) => (
                            <option key={index} value={location.campusName}>
                                {location.campusName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* SECTION 2: STUDENT INFORMATION */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">02</span>
                    <h3 className="text-2xl font-bold text-slate-900">Student Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup label="Full Name" name="studentName" placeholder="Enter student's full name" required />
                    <InputGroup label="Date of Birth" name="dob" type="date" required />
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                        <div className="flex gap-4">
                            <label className="flex-1 flex items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 transition-all">
                                <input type="radio" name="gender" value="male" className="mr-2" required /> Male
                            </label>
                            <label className="flex-1 flex items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 transition-all">
                                <input type="radio" name="gender" value="female" className="mr-2" /> Female
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Applying For</label>
                        <select name="level" required className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Level</option>
                            <option value="S.1">S.1 (O-Level)</option>
                            <option value="S.2">S.2 (O-Level)</option>
                            <option value="S.3">S.3 (O-Level)</option>
                            <option value="S.4">S.4 (O-Level)</option>
                            <option value="S.5">S.5 (A-Level)</option>
                            <option value="S.6">S.6 (A-Level)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* SECTION 3: PARENT/GUARDIAN CONTACT */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">03</span>
                    <h3 className="text-2xl font-bold text-slate-900">Guardian Contact</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup label="Parent/Guardian Name" name="parentName" placeholder="Your full name" required />
                    <InputGroup label="Email Address" name="email" type="email" placeholder="example@gmail.com" required />
                    <InputGroup label="Phone Number" name="phone" placeholder="+256..." required />
                    <InputGroup label="Current Address" name="address" placeholder="City, Region" required />
                </div>
            </div>

            <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-6 rounded-2xl font-bold text-xl transition-all shadow-lg flex items-center justify-center gap-3 ${
                    status === 'loading' 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-[0.98]'
                }`}
            >
                {status === 'loading' ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Submit Official Application'
                )}
            </button>
        </form>
    );
}

function InputGroup({ label, ...props }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
            <input 
                {...props} 
                className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400" 
            />
        </div>
    );
}