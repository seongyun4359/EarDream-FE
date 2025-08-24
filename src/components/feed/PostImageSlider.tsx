import React, { useState } from "react";

interface PostImageSliderProps {
  imageUrls: string[];
  title: string;
}

const PostImageSlider: React.FC<PostImageSliderProps> = ({
  imageUrls,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrls.length) return <div>이미지 없음</div>;

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-full mb-3">
      <img
        src={imageUrls[currentIndex]}
        alt={`${title} ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />

      {imageUrls.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 bg-opacity-30 text-white p-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 bg-opacity-30 text-white p-2 rounded-full"
          >
            ▶
          </button>
          <div className="absolute bottom-2 right-2 bg-gray-200 bg-opacity-20 text-black text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {imageUrls.length}
          </div>
        </>
      )}
    </div>
  );
};

export default PostImageSlider;
