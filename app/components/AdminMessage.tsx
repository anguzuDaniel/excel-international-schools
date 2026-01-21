import Image from 'next/image';

interface AdminMessageProps {
  name: string;
  role: string;
  message: string;
  image: string;
}

export default function AdminMessage({ name, role, message, image }: AdminMessageProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="relative w-24 h-24 mb-6 mx-auto lg:mx-0 overflow-hidden rounded-2xl">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{name}</h3>
      <p className="text-blue-600 font-medium text-sm mb-4">{role}</p>
      <p className="text-slate-600 italic leading-relaxed">"{message}"</p>
    </div>
  );
}