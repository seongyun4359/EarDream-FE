import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ImageUploadButton from "../components/common/ImageUploadButton";

const album = {
  name: "김가족의 앨범",
  postCount: "3",
  author: "김가족",
  writeDate: "2025년 08월 19일",
};

const AlbumCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("");

  const handleSave = () => {
    navigate("/home");
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <MainLayout>
      <Header title="내 정보 관리" />

      <div className="flex justify-center mt-8">
        <ImageUploadButton
          image={profileImage}
          onChange={handleImageChange}
          size={100}
          isShowPreview={true}
        />
      </div>

      {/* 이름 수정 */}
      <div className="p-4 flex flex-col space-y-10">
        <div>
          <p className="font-bold">앨범 이름</p>
          <Input
            value={album.name}
            placeholder="앨범 이름을 입력해주세요"
            onChange={setProfileImage}
            className="mt-4"
          />
        </div>

        <Button
          type="button"
          variant="primary"
          size="medium"
          onClick={handleSave}
          className="mt-30 w-full"
        >
          추가하기
        </Button>
      </div>
    </MainLayout>
  );
};

export default AlbumCreatePage;
