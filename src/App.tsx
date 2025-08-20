import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WriteNewsPage from "./pages/WriteNewsPage";
import NewsBoxPage from "./pages/NewsBoxPage";
import MyPage from "./pages/MyPage";
import SplashPage from "./pages/SplashPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";
import FamilyMembersPage from "./pages/FamilyMembersPage";
import MemberEditPage from "./pages/MemberEditPage";
import WaitListPage from "./pages/WaitListPage";
import FamilyInvitePage from "./pages/FamilyInvitePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* page 경로 수정 필요 */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/write-news" element={<WriteNewsPage />} />
          <Route path="/news-box" element={<NewsBoxPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyInfoEditPage />} />
          <Route path="/member" element={<FamilyMembersPage />} />
          <Route path="/member/edit" element={<MemberEditPage />} />
          <Route path="/member/waitList" element={<WaitListPage />} />
          <Route path="/member/invite" element={<FamilyInvitePage />} />
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
