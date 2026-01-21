export default function MissionAndVision({ mission, vision }: { mission: string, vision: string }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
            <span className="p-3 bg-blue-50 rounded-2xl text-2xl mr-4">🎯</span>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            </div>
            <p className="text-slate-600 leading-relaxed italic text-lg">
            "{mission}"
            </p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
            <span className="p-3 bg-amber-50 rounded-2xl text-2xl mr-4">👁️</span>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            </div>
            <p className="text-slate-600 leading-relaxed italic text-lg">
            "{vision}"
            </p>
        </div>
        </div>
    );
}