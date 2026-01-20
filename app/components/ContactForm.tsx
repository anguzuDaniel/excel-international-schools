"use client";

export default function ContactForm() {
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
            <input 
              type="text"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
              placeholder="Kyambadde Emmanuel" 
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <input 
              type="email"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
              placeholder="name@example.com" 
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Inquiry Type</label>
          <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none">
            <option>General Inquiry</option>
            <option>Admissions</option>
            <option>Fees & Payments</option>
            <option>E-Learning Support</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Your Message</label>
          <textarea 
            className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
            rows={5} 
            placeholder="How can we help you today?" 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>Send Secure Message</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="path d='M14 5l7 7m0 0l-7 7m7-7H3'" />
          </svg>
        </button>
        
        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest">
          We usually respond within 24 business hours
        </p>
      </form>
    </div>
  );
}