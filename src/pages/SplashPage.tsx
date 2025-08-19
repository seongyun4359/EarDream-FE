import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="/eardream.svg"
          alt="EarDream Logo"
          className="w-[110px] h-[110px]"
        />
      </div>
    </div>
  );
};

export default SplashPage;
