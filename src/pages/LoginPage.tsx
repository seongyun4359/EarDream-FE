import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import MainLayout from "../components/layout/MainLayout";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: 실제 로그인 로직 구현
    console.log("로그인 시도:", { email, password });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 구현
    console.log("카카오 로그인");
  };

  return (
    <MainLayout showNavigation={false}>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-full sm:max-w-md md:max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">EarDream</h1>
            <p className="text-gray-600">가족과의 소중한 순간을 담아드립니다</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <Input
              type="email"
              label="이메일"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={setEmail}
              required
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={setPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="space-y-3">
            <Button
              variant="outline"
              size="large"
              className="w-full"
              onClick={handleKakaoLogin}
            >
              카카오로 로그인
            </Button>

            <div className="text-center">
              <span className="text-gray-500">계정이 없으신가요? </span>
              <button className="text-[#018941] hover:text-[#017a3a] font-medium">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
