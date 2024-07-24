import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext.js';
import { server } from '../../index.js';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBIcon
} from 'mdb-react-ui-kit';
import { CSSTransition } from 'react-transition-group';
import './HomePage.css';

const HomePage = () => {
  const { courses, fetchAllCourses } = useCourseContext();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <div className="home-page">
      <MDBContainer className="mt-5">
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="fade"
        >
          <MDBCard className="shadow-lg no-bg welcome-card">
            <MDBCardBody>
              <MDBCardTitle className="text-center display-4 mt-4 mb-4">
                Welcome to LearningAdda Platform
              </MDBCardTitle>
              <MDBCardText className="text-center lead mb-5">
                Explore and enhance your knowledge with our extensive courses.
              </MDBCardText>
              <div className="d-flex justify-content-center mb-4">
                <Link to="/all-courses">
                  <MDBBtn color="primary" size="lg">
                    Explore Courses
                  </MDBBtn>
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </CSSTransition>

        <MDBRow className="mt-5">
          {courses.map((course) => (
            <MDBCol md="4" key={course._id} className="mb-4">
              <MDBCard className="h-100 shadow-sm course-card">
                {course.image && (
                  <MDBCardImage src={`${server}/${course.image}`} position="top" alt={course.title} />
                )}
                <MDBCardBody>
                  <MDBCardTitle>{course.title}</MDBCardTitle>
                  {course.price && (
                  <MDBCardText>
                    <strong>Price: </strong>
                    <s>Rs.{course.price}</s> Enroll now to get it for free
                  </MDBCardText>
                )}
                  <div className="d-flex justify-content-center">
                    <Link to={`/course/${course._id}`}>
                      <MDBBtn color="secondary"><MDBIcon icon="compass" className="me-2" /> Explore</MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default HomePage;
