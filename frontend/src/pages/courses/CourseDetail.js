import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext.js';
import { UserData } from '../../context/UserContext.js';
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
  MDBSpinner
} from 'mdb-react-ui-kit';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { selectedCourse, fetchCourseById, lectures, fetchLecturesByCourseId, deleteLecture, enrollInCourse } = useCourseContext();
  const { user } = UserData();
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCourseById(courseId);

        // Fetch lectures and check enrollment status
        await fetchLecturesByCourseId(courseId);
        if (user) {
          setIsEnrolled(user.subscription.includes(courseId));
        }
      } catch (error) {
        console.error('Failed to fetch course details or lectures:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, fetchCourseById, fetchLecturesByCourseId, user]);

  const handleEnrollClick = async () => {
    try {
      await enrollInCourse(courseId);
      setIsEnrolled(true); // Update state after successful enrollment
      navigate('/my-courses'); // Redirect to "My Courses" page
    } catch (err) {
      console.error('Failed to enroll in course:', err);
    }
  };

  if (loading) {
    return (
      <MDBContainer className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  // Function to convert duration from minutes to hours and minutes
  const convertDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleAddLectureClick = () => {
    navigate(`/add-lecture/${selectedCourse._id}`); // Adjust route as necessary
  };

  const handleDeleteLecture = async (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await deleteLecture(lectureId);
      } catch (err) {
        console.error('Failed to delete lecture:', err);
      }
    }
  };

  return (
    <MDBContainer className='py-5'>
      {selectedCourse && (
        <MDBCard className='mb-4 shadow-3'>
          {selectedCourse.image && (
            <MDBCardImage
              src={`http://localhost:5000/${selectedCourse.image}`} // Replace with your backend URL
              alt={selectedCourse.title}
              position="top"
            />
          )}
          <MDBCardBody>
            <MDBCardTitle className='h3'>{selectedCourse.title}</MDBCardTitle>
            <MDBCardText className='text-muted'>{selectedCourse.description}</MDBCardText>
            <MDBCardText>
              {selectedCourse.price && (
                <div>
                  <MDBIcon fas icon="rupee-sign" className='me-2'/>
                  <strong> : </strong>{selectedCourse.price}.
                </div>
              )}
              {selectedCourse.duration && (
                <div>
                  <MDBIcon fas icon="clock" className='me-2'/>
                  {convertDuration(selectedCourse.duration)}
                </div>
              )}
              {selectedCourse.createdBy && (
                <div>
                  <MDBIcon fas icon="user" className='me-2'/>
                  {selectedCourse.createdBy}
                </div>
              )}
            </MDBCardText>
            <div className="d-flex justify-content-end">
              {user && user.role === 'admin' && (
                <MDBBtn color="primary" onClick={handleAddLectureClick} className="ms-3">
                  <MDBIcon fas icon="plus" className='me-2'/> Add Lecture
                </MDBBtn>
              )}
              {!user ? (
                <MDBBtn color="success" onClick={handleEnrollClick} className="ms-3">
                  <MDBIcon fas icon="sign-in-alt" className='me-2'/> Enroll Now For Free
                </MDBBtn>
              ) : null}
            </div>
          </MDBCardBody>
        </MDBCard>
      )}

      {user && user.role === 'admin' ? (
        <MDBRow>
          {lectures.length > 0 ? (
            lectures.map(lecture => (
              <MDBCol key={lecture._id} md='4' className='mb-4'>
                <MDBCard className='h-100 shadow-3'>
                  <MDBCardBody>
                    <MDBCardTitle>{lecture.title}</MDBCardTitle>
                    <MDBCardText>{lecture.description}</MDBCardText>
                    <MDBCardText>
                      <MDBIcon fas icon="clock" className='me-2' />
                      {convertDuration(lecture.duration)}
                    </MDBCardText>
                    <div className="d-flex justify-content-between">
                      <MDBBtn color='secondary' onClick={() => navigate(`/lecture/${lecture._id}`)}>
                        <MDBIcon fas icon="info-circle" className='me-2' /> View Details
                      </MDBBtn>
                      {user.role === 'admin' ? (
                        <MDBBtn color='danger' onClick={() => handleDeleteLecture(lecture._id)}>
                          <MDBIcon fas icon="trash" className='me-2' /> Delete Lecture
                        </MDBBtn>
                      ) : (
                        <MDBBtn color='info' onClick={() => window.open(lecture.video, '_blank')}>
                          <MDBIcon fas icon="play" className='me-2' /> Watch Lecture
                        </MDBBtn>
                      )}
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <MDBContainer className='py-5 text-center'>
              <p className='h5'>No lectures available for this course.</p>
            </MDBContainer>
          )}
        </MDBRow>
      ) : isEnrolled ? (
        <MDBRow>
          {lectures.length > 0 ? (
            lectures.map(lecture => (
              <MDBCol key={lecture._id} md='4' className='mb-4'>
                <MDBCard className='h-100 shadow-3'>
                  <MDBCardBody>
                    <MDBCardTitle>{lecture.title}</MDBCardTitle>
                    <MDBCardText>{lecture.description}</MDBCardText>
                    <MDBCardText>
                      <MDBIcon fas icon="clock" className='me-2' />
                      {convertDuration(lecture.duration)}
                    </MDBCardText>
                    <div className="d-flex justify-content-between">
                      <MDBBtn color='secondary' onClick={() => navigate(`/lecture/${lecture._id}`)}>
                        <MDBIcon fas icon="info-circle" className='me-2' /> View Details
                      </MDBBtn>
                      <MDBBtn color='info' onClick={() => window.open(lecture.video, '_blank')}>
                        <MDBIcon fas icon="play" className='me-2' /> Watch Lecture
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <MDBContainer className='py-5 text-center'>
              <p className='h5'>No lectures available for this course.</p>
            </MDBContainer>
          )}
        </MDBRow>
      ) : (
        <MDBContainer className='py-5 text-center'>
          <p className='h5'>You need to enroll in this course to view the lectures.</p>
          <MDBBtn color="success" onClick={handleEnrollClick} className="ms-3">
            <MDBIcon fas icon="sign-in-alt" className='me-2' /> Enroll Now For Free
          </MDBBtn>
        </MDBContainer>
      )}
    </MDBContainer>
  );
};

export default CourseDetail;
