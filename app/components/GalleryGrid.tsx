import Image from "next/image";

export default function GalleryGrid({ images }: { images: { src: string }[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-3 md:gap-4">
      {images.map((image, index) => {
        // Feature logic:
        // Index 0: Large square (Mobile: 2x2, Desktop: 2x2)
        // Index 5: Tall block (Mobile: 1x2, Desktop: 1x2)
        const isFeatured = index === 0;
        const isTall = index === 5 || index === 2;

        return (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-2xl group transition-all duration-500 shadow-sm hover:shadow-xl ${
              isFeatured 
                ? 'col-span-2 row-span-2' // Full width on mobile, half on desktop
                : isTall 
                  ? 'row-span-2' 
                  : 'col-span-1 row-span-1'
            }`}
          >
            <Image
              src={image.src}
              alt={`Merryland Gallery ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-blue-900/40 transition-colors duration-300" />
          </div>
        );
      })}
    </div>
  );
}