export default function Curriculum({ curriculum }: any) {
    return (
      <div className="space-y-8">
        {/* Intro Text */}
        <div className="max-w-3xl border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed font-medium">
            {curriculum?.description || 'Merryland High Schools offers a comprehensive academic program following the UNEB standards, focusing on both sciences and humanities.'}
          </p>
        </div>

        {/* Curriculum Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curriculum?.levels?.map((level: any, index: number) => (
            <div 
              key={index} 
              className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {level.title?.charAt(0) || "L"}
                </div>
                <h3 className="text-2xl font-bold text-blue-900">{level.title}</h3>
              </div>
              
              <div className="text-gray-600 space-y-3">
                {/* Using whitespace-pre-line so that line breaks from Sanity are preserved */}
                <p className="whitespace-pre-line leading-relaxed">
                  {level.details}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold text-sm">
                <span>Learn more about {level.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:ml-3 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}