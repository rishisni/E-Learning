import React, { useEffect } from 'react';
import { useCourseContext } from '../../context/CourseContext.js';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext.js';
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
  const { user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const imageContainerStyles = {
    height: '200px',
    overflow: 'hidden',
  };

  const cardImageStyles = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  };

  const cardBodyStyles = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const cardTextStyles = {
    marginTop: 'auto',
  };

  return (
    <MDBContainer className='py-5'>
      <MDBRow>
        {courses.map(course => (
          <MDBCol key={course._id} md='4' className='mb-4'>
            <MDBCard style={cardStyles}>
              {course.image && (
                <div style={imageContainerStyles}>
                  <MDBCardImage
                    src={`${server}/${course.image}`}
                    alt={course.title}
                    style={cardImageStyles}
                  />
                </div>
              )}
              <MDBCardBody style={cardBodyStyles}>
                <MDBCardTitle>{course.title}</MDBCardTitle>
                {course.price && (
                  <MDBCardText>
                    <strong>Price: </strong>
                    <s>Rs.{course.price}</s> Enroll now to get it for free
                  </MDBCardText>
                )}
                {course.createdBy && (
                  <MDBCardText>
                    <strong>By: </strong>{course.createdBy}
                  </MDBCardText>
                )}
                <div style={cardTextStyles}>
                  <MDBBtn
                    color="secondary"
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="ms-3"
                  >
                    <MDBIcon icon="compass" className="me-2" /> Explore
                  </MDBBtn>
                  {user && user.role === 'admin' && (
                    <MDBBtn
                      color="danger"
                      onClick={() => deleteCourse(course._id)}
                      className="ms-3"
                    >
                      <MDBIcon icon="trash" className="me-2" /> Delete
                    </MDBBtn>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default CoursesList;
