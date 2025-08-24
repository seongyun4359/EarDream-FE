import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../../assets/icons/ImageIcon";

interface AlbumProps {
  images?: string[];
  coverImage?: string;
  albumName: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const Album: React.FC<AlbumProps> = ({
  images,
  coverImage,
  albumName,
  onDelete,
  className,
}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    console.log("클릭 옵션:", option);
    setDropdownOpen(false);
    switch (option) {
      case "앨범 정보":
        navigate("/home/album/info");
        break;
      case "앨범 편집":
        navigate("/home/album/edit");
        break;
      case "삭제":
        onDelete?.();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {coverImage ? (
        <img
          src={coverImage}
          alt="앨범 커버"
          className="w-full h-full object-cover"
        />
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1">
          {images.slice(0, 4).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`앨범 이미지 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-gray-300" />
        </div>
      )}

      <div className="absolute bottom-2 right-2 bg-white bg-opacity-50 text-black text-sm px-2 py-1 shadow-sm rounded">
        {albumName}
      </div>

      <div className="absolute top-2 right-2">
        <div>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
            <ul>
              {["앨범 정보", "앨범 편집", "삭제"].map((option) => (
                <li
                  key={option}
                  className={`px-4 py-2 cursor-pointer ${
                    option === "삭제"
                      ? "text-red-500 hover:bg-red-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Album;
