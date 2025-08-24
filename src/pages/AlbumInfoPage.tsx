import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ImageUploadButton from "../components/common/ImageUploadButton";

const AlbumInfoPage: React.FC = () => {
  const album = {
    name: "김가족의 앨범",
    postCount: "3",
    author: "김가족",
    writeDate: "2025년 08월 19일",
  };

  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("");
  const [albumName, setAlbumName] = useState<string>(album.name);

  /* TODO: 앨범 정보 저장하는 함수 로직 */
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
      <Header title="앨범 정보" />

      <div className="flex justify-center mt-8">
        <ImageUploadButton
          image={profileImage}
          onChange={handleImageChange}
          size={100}
          isShowPreview={true}
        />
      </div>

      {/* 앨범 정보 수정 */}
      <div className="space-y-6 p-4">
        <div>
          <p className="font-bold">앨범 이름</p>
          <Input
            value={albumName}
            placeholder="앨범 이름을 입력해주세요"
            onChange={setAlbumName}
            className="mt-2"
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-bold">게시글 갯수</p>
            <p className="text-gray-400 mt-2">{album.postCount}개</p>
          </div>

          <div>
            <p className="font-bold">작성자</p>
            <p className="text-gray-400 mt-2">{album.author}</p>
          </div>

          <div>
            <p className="font-bold">작성 날짜</p>
            <p className="text-gray-400 mt-2">{album.writeDate}</p>
          </div>
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

export default AlbumInfoPage;
