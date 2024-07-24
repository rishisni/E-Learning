import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';

const MyCourses = () => {
  const { myCourses, fetchMyCourses } = useCourseContext();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        await fetchMyCourses();
      } catch (error) {
        console.error('Failed to fetch my courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [fetchMyCourses]);

  if (loading) {
    return (
      <MDBContainer className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };
  const convertDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <MDBContainer className='py-5'>
      <h2 className='mb-4'>My Courses</h2>
      {myCourses.length > 0 ? (
        <MDBRow>
          {myCourses.map(course => (
            <MDBCol key={course._id} md='4' className='mb-4'>
              <MDBCard className='h-100 shadow-3' onClick={() => handleCardClick(course._id)} style={{ cursor: 'pointer' }}>
                {course.image && (
                  <MDBCardImage
                    src={`http://localhost:5000/${course.image}`} // Adjust URL as needed
                    alt={course.title}
                    position="top"
                  />
                )}
                <MDBCardBody>
                  <MDBCardTitle className='h5'>{course.title}</MDBCardTitle>
                  
                  <MDBCardText>
                  {course.price ? (
                <>
                  <MDBIcon fas icon="rupee-sign" className='me-2'/>
                 <s>{course.price}.</s>  <strong>You got it for free!</strong>
                </>
              ) : (
                <strong>This course is free!</strong>
              )}
                  </MDBCardText>
                  <MDBCardText>
                    <MDBIcon fas icon="clock" className='me-2'/>
                    {convertDuration(course.duration)}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <MDBContainer className='py-5 text-center'>
          <p className='h5'>You are not enrolled in any courses.</p>
        </MDBContainer>
      )}
    </MDBContainer>
  );
};

export default MyCourses;
