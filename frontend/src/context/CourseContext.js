import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api.js';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const fetchAllCourses = useCallback(async () => {
    try {
      const response = await axios.get('/api/all-courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  }, []);

  const fetchMyCourses = useCallback(async () => {
    try {
      const response = await axios.get('/api/mycourses');
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error('Failed to fetch my courses:', error);
    }
  }, []);

  const fetchCourseById = useCallback(async (courseId) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`);
      setSelectedCourse(response.data.course);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  }, []);

  const fetchLecturesByCourseId = useCallback(async (courseId) => {
    try {
      const response = await axios.get(`/api/lectures/${courseId}`);
      setLectures(response.data.lectures);
    } catch (error) {
      console.error('Failed to fetch lectures:', error);
    }
  }, []);

  const fetchLectureById = useCallback(async (lectureId) => {
    try {
      const response = await axios.get(`/api/lecture/${lectureId}`);
      return response.data.lecture; // Return the lecture data
    } catch (error) {
      console.error('Failed to fetch lecture:', error);
      throw error; // Re-throw error for handling in the component
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  const createCourse = useCallback(async (courseData) => {
    try {
      await axios.post('/api/create-course', courseData);
      fetchAllCourses();
      navigate('/all-courses');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  }, [fetchAllCourses, navigate]);

  const addLecture = useCallback(async (courseId, lectureData) => {
    try {
      await axios.post(`/api/course/${courseId}`, lectureData);
      fetchLecturesByCourseId(courseId);
    } catch (error) {
      console.error('Failed to add lecture:', error);
    }
  }, [fetchLecturesByCourseId]);

  const deleteCourse = useCallback(async (courseId) => {
    try {
      await axios.delete(`/api/delete-course/${courseId}`);
      fetchAllCourses();
      navigate('/all-courses');
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  }, [fetchAllCourses, navigate]);

  const deleteLecture = useCallback(async (lectureId) => {
    try {
      await axios.delete(`/api/delete-lecture/${lectureId}`);
      setLectures((prevLectures) => prevLectures.filter(lecture => lecture._id !== lectureId));
    } catch (error) {
      console.error('Failed to delete lecture:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

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
