import Image from "next/image";

export default function GalleryGrid({ images }: { images: { src: string }[] }) {
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-medium italic">No gallery images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-6">
      {images.map((image, index) => {
        /**
         * DYNAMIC BENTO PATTERN
         * We use modulo (%) to repeat the layout every 6 images
         */
        const patternIndex = index % 6;
        
        // Pattern 0: Large Square (Featured)
        const isFeatured = patternIndex === 0;
        // Pattern 3 & 5: Tall Rectangles
        const isTall = patternIndex === 3 || patternIndex === 5;
        // Pattern 2: Wide (only on desktop)
        const isWide = patternIndex === 2;

        return (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-[2rem] group transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-1 ${
              isFeatured 
                ? 'col-span-2 row-span-2' 
                : isTall 
                  ? 'row-span-2' 
                  : isWide
                    ? 'lg:col-span-2 col-span-1'
                    : 'col-span-1 row-span-1'
            }`}
          >
            {image.src && (
              <Image
                src={image.src}
                alt={`School Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
               <span className="text-white text-xs font-bold tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 View Image
               </span>
            </div>

            {/* Default Glass Overlay */}
            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors duration-300" />
          </div>
        );
      })}
    </div>
  );
}