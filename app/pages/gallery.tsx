import GalleryGrid from "../components/GalleryGrid";

export default function Gallery({ images }: { images: { src: string }[] }) {
  return (
    <div>
      <GalleryGrid images={images} />
    </div>
  );
}