import React from "react";
import ImageIcon from "../../assets/icons/ImageIcon";

interface ImageUploadButtonProps {
  image?: string;
  onChange?: (file: File) => void;
  size?: number;
  isShowPreview?: boolean;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  image,
  onChange,
  size = 48,
  isShowPreview = true,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onChange) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <label htmlFor="image-upload" className="cursor-pointer">
      <div
        className="rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        {image && isShowPreview ? (
          <img src={image} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon />
        )}
      </div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ImageUploadButton;
