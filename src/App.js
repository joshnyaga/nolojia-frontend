import "./App.css";
import NotFoundPage from "./Pages/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import CoursesPage from "./Pages/CoursesPage";
import Sidebar from "./components/students/SideBar/Sidebar";
import AuthPage from "./Pages/AuthPage";
import SchedulePage from "./Pages/SchedulePage";
import LiveStreamPage from "./Pages/LiveStreamPage";
import AssignmentsPage from "./Pages/AssignmentsPage";
import ChallengesPage from "./Pages/ChallengesPage";
import SideNavTutor from "./components/tutors/SideNav/SideNavTutor";
import TDashBoard from "./Pages/TutorPages/TDashBoard";
import TCourses from "./Pages/TutorPages/TCourses";
import TLesson from "./Pages/TutorPages/TLesson";
import TNotFound from "./Pages/TutorPages/TNotFound";
import SearchCourse from "./TutorContainer/CoursesContainer/SearchCourse";
import Meeting from "./TutorContainer/LiveStreamContainer/Meeting";
import TMeetingPrep from "./Pages/TutorPages/TMeetingPrep";
import StudentLiveStream from "./Pages/StudentLiveStream";
import TSchedulePage from "./Pages/TutorPages/TSchedulePage";
import ForgotPassword from "./StudentContainer/Auth/ForgotPassword";
import EmailVerify from "./StudentContainer/Auth/EmailVerify";
import PasswordReset from "./StudentContainer/Auth/PasswordReset";
import MyPayments from "./StudentContainer/Payments/MyPayments";
import Successful from "./StudentContainer/Payments/Successful";
import ErrorPayments from "./StudentContainer/Payments/ErrorPayments";
import Enroll from "./StudentContainer/Other/Enroll";
import HelpFund from "./StudentContainer/Other/HelpFund";
import InvalidPath from "./StudentContainer/Other/InvalidPath";
import Landing from "./components/code/Landing";
import "./index.css"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<DashboardPage />} />
          <Route path="courses/*" element={<CoursesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="livestream" element={<LiveStreamPage />} />
          <Route path="live/*" element={<StudentLiveStream />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="payments" element={<MyPayments />} />
          <Route path="code" element={<Landing />} />
          <Route path="successful" element={<Successful />} />
          <Route path="error" element={<ErrorPayments />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<SideNavTutor />}>
          <Route index element={<TDashBoard />} />
          <Route path="courses" element={<TCourses />} />
          <Route path="courses/lessons/*" element={<TLesson />} />
          <Route path="courses/searchcourses/*" element={<SearchCourse />} />
          <Route path="liveTutor/*" element={<Meeting />} />
          <Route path="livestream" element={<TMeetingPrep />} />
          <Route path="schedule" element={<TSchedulePage />} />
          <Route path="*" element={<TNotFound />} />
        </Route>
        <Route path="invalidpath" element={<InvalidPath />} />
        <Route path="helpfund/*" element={<HelpFund />} />
        <Route path="enroll" element={<Enroll />} />
        
        <Route path="login" element={<AuthPage />} />
        <Route path="verify/*" element={<EmailVerify />} />
        <Route path="password-reset/*" element={<PasswordReset />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
