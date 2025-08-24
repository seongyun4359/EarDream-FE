import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Header from "../components/common/Header";

const dummyPhotos = Array.from({ length: 20 }).map((_, idx) => ({
  id: String(idx),
  uri: "",
  selected: false,
}));

const AlbumEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(dummyPhotos);

  const toggleSelect = (idx: number) => {
    const newPhotos = [...photos];
    newPhotos[idx].selected = !newPhotos[idx].selected;
    setPhotos(newPhotos);
  };

  const handleConfirm = () => {
    navigate("/home/album/create");
  };

  const handleAddAlbum = () => {
    console.log("앨범 추가 버튼 클릭");
  };

  return (
    <MainLayout>
      <Header title="앨범 편집" />

      <div className="grid grid-cols-2 gap-2 p-4">
        {/* + 앨범 추가하기 버튼 */}
        <div
          className="flex items-center justify-center cursor-pointer bg-gray-100 rounded-lg w-full h-24"
          onClick={handleAddAlbum}
        >
          <span className="text-2xl font-bold text-gray-400">+</span>
        </div>

        {/* 기존 사진들 */}
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="relative cursor-pointer"
            onClick={() => toggleSelect(idx)}
          >
            <img
              src={photo.uri}
              alt={`photo-${idx}`}
              className={`p-4 w-full h-24 object-cover rounded-lg transition-all duration-200 ${
                photo.selected ? "opacity-60" : "opacity-100"
              }`}
            />

            <div
              className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold
                ${photo.selected ? "bg-[#018941]" : "bg-gray-100"}`}
            >
              {photo.selected ? "✓" : ""}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="medium"
        className="mt-6 w-full"
        onClick={handleConfirm}
        disabled={photos.filter((p) => p.selected).length === 0}
      >
        확인
      </Button>
    </MainLayout>
  );
};

export default AlbumEditPage;
