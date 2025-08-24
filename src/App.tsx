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
import NewsPreviewPage from "./pages/NewsPreviewPage";
import MyPage from "./pages/MyPage";
import SplashPage from "./pages/SplashPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";
import FamilyMembersPage from "./pages/FamilyMembersPage";
import MemberEditPage from "./pages/MemberEditPage";
import WaitListPage from "./pages/WaitListPage";
import FamilyInvitePage from "./pages/FamilyInvitePage";
import TutorialPage from "./pages/TutorialPage";
import FamilySetupPage from "./pages/FamilySetupPage";
import FamilyCreatePage from "./pages/FamilyCreatePage";
import FamilyJoinPage from "./pages/FamilyJoinPage";
import FamilySubscribePage from "./pages/FamilySubscribePage";
import PaymentPage from "./pages/PaymentPage";
import RecipientInfoPage from "./pages/RecipientInfoPage";
import GettingStartedPage from "./pages/GettingStartedPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { initKakao } from "./services/kakaoAuth";
import SubscribePage from "./pages/SubscribePage";
import AutoPaymentPage from "./pages/AutoPaymentPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import PaymentManagePage from "./pages/PaymentManagePage";
import AlbumCreatePage from "./pages/AlbumCreatePage";
import AlbumEditPage from "./pages/AlbumEditPage";
import AlbumInfoPage from "./pages/AlbumInfoPage";
import AlbumPhotoPickerPage from "./pages/AlbumPhotoPickerPage";
import EditNewsPage from "./pages/EditNewsPage";

function App() {
  useEffect(() => {
    // 앱 시작 시 카카오 SDK 초기화
    initKakao();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* page 경로 수정 필요 */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/write-news" element={<WriteNewsPage />} />
          <Route path="/news-box" element={<NewsBoxPage />} />
          <Route path="/news-preview/:id" element={<NewsPreviewPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyInfoEditPage />} />
          <Route path="/member" element={<FamilyMembersPage />} />
          <Route path="/member/edit" element={<MemberEditPage />} />
          <Route path="/member/wait-list" element={<WaitListPage />} />
          <Route path="/member/invite" element={<FamilyInvitePage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/family-setup" element={<FamilySetupPage />} />
          <Route path="/family/create" element={<FamilyCreatePage />} />
          <Route path="/family/join" element={<FamilyJoinPage />} />
          <Route path="/family/subscribe" element={<FamilySubscribePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/recipient" element={<RecipientInfoPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/mypage/subscribe" element={<SubscribePage />} />
          <Route path="/mypage/auto-payment" element={<AutoPaymentPage />} />
          <Route
            path="/home/news/detail/:postId"
            element={<NewsDetailPage />}
          />
          <Route path="/home/news/edit/:postId" element={<EditNewsPage />} />
          <Route
            path="/mypage/auto-payment/manage/:id"
            element={<PaymentManagePage />}
          />
          <Route path="/home/album/create" element={<AlbumCreatePage />} />
          <Route path="/home/album/edit" element={<AlbumEditPage />} />
          <Route path="/home/album/info" element={<AlbumInfoPage />} />
          <Route path="/home/album/pick" element={<AlbumPhotoPickerPage />} />
          <Route path="/home" element={<HomePage />} />
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
