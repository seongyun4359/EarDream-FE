import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import { patchPosts } from "../services/postsApi";
import { useUserStore } from "../stores/useUserStore";
import type { Post } from "../types/feed";

interface ImageFile {
  id: string;
  file?: File;
  preview: string;
  isFromServer?: boolean;
}

const EditNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post as Post;

  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.content || "");

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");

  const [additionalImages, setAdditionalImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = useUserStore((state) => state.userId);

  const MAX_IMAGES = 4;
  const MIN_DESCRIPTION = 0;
  const MAX_DESCRIPTION = 100;

  useEffect(() => {
    if (post.imageUrls && post.imageUrls.length > 0) {
      setMainImagePreview(post.imageUrls[0]);
      const additional = post.imageUrls.slice(1).map((url, idx) => ({
        id: `server-${idx}`,
        preview: url,
        isFromServer: true,
      }));
      setAdditionalImages(additional);
    }
  }, [post]);

  const handleAdditionalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          // 첫 번째 사진이면 메인 사진으로 설정
          if (!mainImagePreview) {
            setMainImage(file);
            setMainImagePreview(reader.result as string);
          } else {
            // 이미 메인 사진이 있으면 추가 사진으로 추가
            if (additionalImages.length < MAX_IMAGES - 1) {
              // 메인 사진 1개 + 추가 사진 3개
              const newImage: ImageFile = {
                id: Date.now().toString(),
                file,
                preview: reader.result as string,
              };
              setAdditionalImages((prev) => [...prev, newImage]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (id: string) => {
    setAdditionalImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      const filesToUpload: File[] = [];

      if (mainImage) filesToUpload.push(mainImage);
      additionalImages.forEach((img) => {
        if (img.file) filesToUpload.push(img.file);
      });

      const existingFiles = await Promise.all(
        additionalImages
          .filter((img) => img.isFromServer)
          .map(async (img) => {
            const res = await fetch(img.preview);
            const blob = await res.blob();
            const fileName = img.preview.split("/").pop() || "image.jpg";
            return new File([blob], fileName, { type: blob.type });
          })
      );

      const allFiles = [...filesToUpload, ...existingFiles];

      await patchPosts(post.id, title, description, allFiles);
      navigate("/home");
    } catch (err) {
      console.error("소식 수정 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Header
        title="소식 수정"
        showBackButton
        onBackClick={() => navigate("/home")}
      />

      <div className="p-4 space-y-6">
        {/* 제목 입력 필드 */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018941] focus:border-[#018941] transition-colors duration-200 text-lg"
          />
        </div>

        {/* 사진 갤러리 영역 */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[300px] flex flex-col items-center justify-center">
          {mainImagePreview || additionalImages.length > 0 ? (
            <div className="w-full h-full">
              {/* 사진 슬라이더 */}
              <div className="relative w-full h-full">
                <div className="flex overflow-x-auto space-x-4 pb-4">
                  {mainImagePreview && (
                    <div className="relative flex-shrink-0">
                      <img
                        src={mainImagePreview}
                        alt="메인 이미지"
                        className="w-80 h-60 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setMainImage(null);
                          setMainImagePreview("");
                        }}
                        className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/80 transition-all duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {additionalImages.map((image) => (
                    <div key={image.id} className="relative flex-shrink-0">
                      <img
                        src={image.preview}
                        alt="추가 이미지"
                        className="w-80 h-60 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeAdditionalImage(image.id)}
                        className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/80 transition-all duration-200"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <svg
                className="w-20 h-20 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">사진을 올려주세요</p>
            </div>
          )}
        </div>

        {/* 사진 설명 입력 필드 */}
        {(mainImagePreview || additionalImages.length > 0) && (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={post.content}
                maxLength={MAX_DESCRIPTION}
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018941] focus:border-[#018941] transition-colors duration-200 text-lg resize-none"
                rows={3}
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                {description.length}/{MAX_DESCRIPTION}
              </div>
            </div>
            {description.length > 0 && description.length < MIN_DESCRIPTION && (
              <p className="text-sm text-orange-600">
                최소 {MIN_DESCRIPTION}자 이상 입력해주세요
              </p>
            )}
          </div>
        )}

        {/* 하단 사진 업로드 영역 */}
        <div className="space-y-4">
          <div className="flex space-x-3">
            {additionalImages.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.preview}
                  alt="추가 이미지"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeAdditionalImage(image.id)}
                  className="absolute -top-2 -right-2 bg-black/70 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/80 transition-all duration-200"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {additionalImages.length < MAX_IMAGES - 1 && (
              <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImageUpload}
                  className="hidden"
                  id="additional-image-upload"
                />
                <label
                  htmlFor="additional-image-upload"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* 저장하기 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !title.trim() ||
            (!mainImage && !mainImagePreview) ||
            description.length < MIN_DESCRIPTION
          }
          className="w-full bg-[#018941] text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-[#017a3a] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </MainLayout>
  );
};

export default EditNewsPage;
