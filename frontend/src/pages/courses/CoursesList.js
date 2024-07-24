import React, { useEffect } from 'react';
import { useCourseContext } from '../../context/CourseContext.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext.js'; // Import UserData context
import { server } from '../../index.js';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
  MDBIcon,
} from 'mdb-react-ui-kit';

const CoursesList = () => {
  const { courses, fetchAllCourses, deleteCourse } = useCourseContext();
  const { user } = UserData(); // Get user data from UserData context
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <MDBContainer className='py-5'>
      <MDBRow>
        {courses.map(course => (
          <MDBCol key={course._id} md='4' className='mb-4'>
            <MDBCard>
              {/* If there is an image URL for the course, display it */}
              {course.image && (
                <MDBCardImage src={`${server}/${course.image}`} alt={course.title} fluid />
              )}
              <MDBCardBody>
                <MDBCardTitle>{course.title}</MDBCardTitle>
                {/* Display additional course information */}
                {course.price && (
                  <MDBCardText>
                    <strong>Price: </strong>Rs.{course.price}
                  </MDBCardText>
                )}
                {course.createdBy && (
                  <MDBCardText>
                    <strong>By: </strong>{course.createdBy}
                  </MDBCardText>
                )}
                <MDBBtn color="secondary" onClick={() => navigate(`/course/${course._id}`)} className="ms-3">
                  <MDBIcon icon="compass" className="me-2" /> Explore
                </MDBBtn>
                {/* Conditionally render delete button based on user role */}
                {user && user.role === 'admin' && (
                  <MDBBtn color="danger" onClick={() => deleteCourse(course._id)} className="ms-3">
                    <MDBIcon icon="trash" className="me-2" /> Delete
                  </MDBBtn>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default CoursesList;
