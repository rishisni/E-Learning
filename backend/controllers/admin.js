import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import  { rm } from 'fs';
import { promisify } from "util";
import  fs from 'fs' ;

import { User } from "../models/User.js"

export const createCourse = TryCatch(async (req, res) => {
    const {title, description, category, createdAt, createdBy,duration,price} = req.body 

    const image = req.file ;

    await Courses.create({
        title,
        description,
        price,
        duration,
        category,
        createdAt,
        createdBy,
        image : image?.path,
    });
    res.status(201).json({
        message :"Course Created Succesfully"
    })
}
);
export const addLectures = TryCatch(async (req, res) => {
    // Find the course
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "No Course Found with this id!",
      });
    }
  
    // Extract fields from request body
    const { title, description, duration, videoUrl } = req.body;
  
    // Validate videoUrl (it could be a URL or some specific validation logic)
    if (!videoUrl) {
      return res.status(400).json({
        message: "YouTube URL is required",
      });
    }
  
    // Create the lecture with the URL instead of a file path
    const lecture = await Lecture.create({
      title,
      description,
      duration,
      course: course._id,
      video: videoUrl, // Store the YouTube URL
    });
  
    res.status(201).json({
      message: "Lecture Added Successfully",
    });
  });
  

export const deleteLecture = TryCatch(async (req,res) => {
    const lecture =  await Lecture.findById(req.params.id)
    
    rm(lecture.video, () => {
        console.log("Video  Deleted !")
    });

    await lecture.deleteOne()

    res.json({
        message : "Lecture Deleted !"
    })

})

const unlinkAsync = promisify(fs.unlink)

export const deleteCourse = TryCatch(async (req,res) => {

    const course = await Courses.findById(req.params.id)

    const lectures = await Lecture.find({ course : course._id})

    await Promise.all(
        lectures.map(async(lecture) => {
            await unlinkAsync(lecture.video);
            console.log("Video Deleted ")
        })
    );

    rm(course.image, () => {
        console.log("Image  Deleted !")
    });

    await Lecture.find({course : req.params.id }).deleteMany()

    await course.deleteOne();

    await User.updateMany({},{$pull : { subscription : req.params.id }})

    res.json({
        message :"Course Deleted "
    })

})


export const getAllStats = TryCatch(async(req,res) => {
    const totalCourses = (await Courses.find()).length ;
    const totalLectures = (await Lecture.find()).length ;
    const totalUsers = (await User.find()).length ;

    const stats  = {
        totalCourses,
        totalLectures,
        totalUsers,
    }
    res.json({
        stats,
    })

})