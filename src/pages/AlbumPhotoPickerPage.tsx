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

const AlbumPhotoPickerPage: React.FC = () => {
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

  return (
    <MainLayout>
      <Header title="앨범 추가하기" />

      {/* 사진 그리드 */}
      <div className="grid grid-cols-2 gap-2 p-4">
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

      {/* 선택 완료 버튼 */}
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

export default AlbumPhotoPickerPage;
