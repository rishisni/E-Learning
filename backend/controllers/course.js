// controllers/course.js

import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    res.json({ course });
});

export const fetchLectures = TryCatch(async (req, res) => {
    const courseId = req.params.id;
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        // Admins can see all lectures for a course
        const lectures = await Lecture.find({ course: courseId });
        return res.json({ lectures });
    }

    if (!user.subscription || !user.subscription.includes(courseId)) {
        return res.status(400).json({ message: 'You are not subscribed to this course.' });
    }

    // Non-admins can only see lectures if they are enrolled
    const lectures = await Lecture.find({ course: courseId });
    res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
    const lectureId = req.params.id;
    const user = await User.findById(req.user._id);

    // Check if user is enrolled or is an admin
    const lecture = await Lecture.findById(lectureId);
    if (user.role !== 'admin' && !user.subscription.includes(lecture.course)) {
        return res.status(400).json({ message: 'You are not subscribed to this course.' });
    }

    res.json({ lecture });
});

// controllers/course.js
export const getMyCourses = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).populate('subscription').exec();
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const courses = user.subscription; // This will be an array of course objects
    res.json({ courses });
  });
  

export const checkout = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
  
    // Check if user is already subscribed to the course
    if (user.subscription.includes(course._id)) {
      return res.status(400).json({ message: "You are already subscribed to this course." });
    }
  
    // If not subscribed, enroll the user in the course
    user.subscription.push(course._id);
    await user.save();
  
    res.json({ message: "Enrolled successfully!", course });
  });