// routes/courseRoutes.js

import express from 'express';
import { fetchLecture, fetchLectures, getAllCourses, getMyCourses, getSingleCourse ,checkout } from '../controllers/course.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();
router.get('/all-courses', getAllCourses);
router.get('/course/:id', getSingleCourse);
router.get('/lectures/:id', isAuth, fetchLectures);
router.get('/lecture/:id', isAuth, fetchLecture);
router.get('/mycourses', isAuth, getMyCourses);

router.post('/checkout/:id', isAuth, checkout);
export default router;
