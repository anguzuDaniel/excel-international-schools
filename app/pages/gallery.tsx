import GalleryGrid from "../components/GalleryGrid";

export default function Gallery() {
  const images = [
    { src: "/images/merryland.jpg", height: 500, width: 500 },
    { src: "/images/school.jpg", height: 500, width: 500 },
    { src: "/images/merryland.jpg", height: 500, width: 500 },
    { src: "/images/school.jpg", height: 500, width: 500 },
    { src: "/images/merryland.jpg", height: 500, width: 500 },
    { src: "/images/school.jpg", height: 500, width: 500 },
    { src: "/images/merryland.jpg", height: 500, width: 500 },
    { src: "/images/school.jpg", height: 500, width: 500 },
  ];

  return (
    <div>
      <GalleryGrid images={images} />
    </div>
  );
}