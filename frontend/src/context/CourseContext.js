// context/CourseContext.js

import React, { createContext, useState, useContext, useEffect , navigate } from 'react';
import axios from '../api/api.js';


const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [stats, setStats] = useState({});

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get('/api/all-courses'); // Adjusted API path
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchMyCourses = async () => {
    try {
      const response = await axios.get('/api/mycourses');
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error('Failed to fetch my courses:', error);
    }
  };

  const fetchCourseById = async (courseId) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`);
      setSelectedCourse(response.data.course);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const fetchLecturesByCourseId = async (courseId) => {
    try {
      const response = await axios.get(`/api/lectures/${courseId}`);
      setLectures(response.data.lectures);
    } catch (error) {
      console.error('Failed to fetch lectures:', error);
    }
  };

  const fetchLectureById = async (lectureId) => {
    try {
      const response = await axios.get(`/api/lecture/${lectureId}`);
      // Assuming the lecture details are included in the response
    } catch (error) {
      console.error('Failed to fetch lecture:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const createCourse = async (courseData) => {
    try {
      await axios.post('/api/create-course', courseData);
      fetchAllCourses();
      navigate('/api/all-courses');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  const addLecture = async (courseId, lectureData) => {
    try {
      await axios.post(`/api/course/${courseId}`, lectureData);
      fetchLecturesByCourseId(courseId);
    } catch (error) {
      console.error('Failed to add lecture:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/delete-course/${courseId}`);
      fetchAllCourses();
      navigate('/api/all-courses');
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await axios.delete(`/api/delete-lecture/${lectureId}`);
      setLectures((prevLectures) => prevLectures.filter(lecture => lecture._id !== lectureId));
    } catch (error) {
      console.error('Failed to delete lecture:', error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
    // fetchMyCourses(); // Assuming this function is defined correctly
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        myCourses,
        selectedCourse,
        lectures,
        stats,
        fetchAllCourses,
        fetchMyCourses,
        fetchCourseById,
        fetchLecturesByCourseId,
        fetchLectureById,
        fetchStats,
        createCourse,
        addLecture,
        deleteCourse,
        deleteLecture
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
