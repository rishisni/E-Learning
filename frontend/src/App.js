import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import VerifyPage from './pages/auth/VerifyPage';
import { UserContextProvider } from './context/UserContext'; // Ensure correct import
import { CourseProvider } from './context/CourseContext';
import AboutPage from './pages/about/AboutPage.js';
import CourseDetail from './pages/courses/CourseDetail.js';
import CoursesList from './pages/courses/CoursesList.js';
import CreateCourse from './pages/courses/CreateCourse.js';
import AddLecture from './pages/lectures/addlecture.js';
import LectureDetail from './pages/lectures/lecturedetail.js';
import StatsPage from './pages/stats/statspage.js';
import MyCourses from './pages/mycourses/Mycourse.js';
import Footer from './pages/footer/Footer.js';

const App = () => {
  return (
    <Router>
       <div className="d-flex flex-column min-vh-100">
       <div className="flex-grow-1">
      <UserContextProvider>
        <CourseProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path='/all-courses' element={<CoursesList />} />
            <Route path='/course/:courseId' element={<CourseDetail />} />
            <Route path='/create-course' element={<CreateCourse />} />
            <Route path="/add-lecture/:courseId" element={<AddLecture />} />
            <Route path="/lecture/:lectureId" element={<LectureDetail />} /> 
            <Route path='/stats' element={<StatsPage />} />
            <Route path='/my-courses' element={<MyCourses />} />
          </Routes>
        </CourseProvider>
      </UserContextProvider>
      </div>
      <Footer/>
      </div>
    </Router>
  );
};

export default App;
