import { useEffect, useState } from "react";
import Image from "next/image";

export function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // List of images in the slideshow folder
  // You can add more images to this array as you add them to the public/slideshow folder
  const images = [
    "fallback.jpg",
    "fallback2.png",
    // Add more image names here as you add them to the slideshow folder
  ];

  const rotationInterval = 7000; // 7 seconds per image

  useEffect(() => {
    if (images.length <= 1) return; // Don't rotate if only one image or no images

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Set loading to false after component mounts
    setIsLoading(false);
  }, []);

  if (images.length === 0) {
    return (
      <div className="w-full rounded-lg flex items-center justify-center p-2">
        <Image
          className="rounded-lg transition-opacity duration-500"
          width={1300}
          height={500}
          src={`/slideshow/fallback.jpg`} // Fallback image if no images are found
          alt={`Fallback image`}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div className="border-2 border-slate-500 rounded-lg flex items-center justify-center p-2 relative">
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px] w-[400px]">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-yellow-400"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="relative overflow-hidden rounded-lg">
            <Image
              className="rounded-lg transition-opacity duration-500"
              width={1400}
              height={500}
              src={`/slideshow/${images[currentImageIndex]}`}
              alt={`Slideshow image ${currentImageIndex + 1}`}
              priority={currentImageIndex === 0}
            />
          </div>
        </>
      )}
    </div>
  );
}
