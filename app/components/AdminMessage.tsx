import Section from "./Section";

interface AdminMessageProps {
  title: string;
  message: string;
  name: string;
  role: string;
  image?: string;
}

// Inside components/AdminMessage.tsx
export default function AdminMessage({ name, role, message, image }: any) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full md:w-1/3 h-64 md:h-auto relative bg-blue-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="p-8 md:w-2/3 flex flex-col justify-center">
        <div className="mb-4">
          <svg className="h-8 w-8 text-blue-200 mb-2" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4z" />
          </svg>
          <p className="text-gray-700 italic text-lg leading-relaxed">"{message}"</p>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-blue-900">{name}</h4>
          <p className="text-blue-600 font-medium uppercase text-sm tracking-wider">{role}</p>
        </div>
      </div>
    </div>
  );
}