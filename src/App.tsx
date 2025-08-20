import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WriteNewsPage from "./pages/WriteNewsPage";
import NewsBoxPage from "./pages/NewsBoxPage";
import MyPage from "./pages/MyPage";
import SplashPage from "./pages/SplashPage";
import TutorialPage from "./pages/TutorialPage";
import FamilySetupPage from "./pages/FamilySetupPage";
import FamilyCreatePage from "./pages/FamilyCreatePage";
import FamilyJoinPage from "./pages/FamilyJoinPage";
import FamilySubscribePage from "./pages/FamilySubscribePage";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { initKakao } from "./services/kakaoAuth";

function App() {
  useEffect(() => {
    // 앱 시작 시 카카오 SDK 초기화
    initKakao();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/family-setup" element={<FamilySetupPage />} />
          <Route path="/family/create" element={<FamilyCreatePage />} />
          <Route path="/family/join" element={<FamilyJoinPage />} />
          <Route path="/family/subscribe" element={<FamilySubscribePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/write-news"
            element={
              <ProtectedRoute>
                <WriteNewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-box"
            element={
              <ProtectedRoute>
                <NewsBoxPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />

          {/* TODO: 추가 페이지들 구현 후 주석 해제 */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/invite/:inviteCode" element={<InvitePage />} /> */}
          {/* <Route path="/family/:familyId" element={<FamilyPage />} /> */}

          {/* 404 페이지 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
