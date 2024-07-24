import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext.js';
import { UserData } from '../../context/UserContext.js';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBSpinner,
  MDBIcon
} from 'mdb-react-ui-kit';

const LectureDetail = () => {
  const { lectureId } = useParams();
  const { fetchLectureById } = useCourseContext();
  const { user } = UserData();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLectureById(lectureId);
        if (data) {
          setLecture(data);
        } else {
          setError('Lecture not found');
        }
      } catch (err) {
        setError('Failed to fetch lecture');
        console.error('Error fetching lecture:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lectureId, fetchLectureById]);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(lecture?.video);

  if (loading) {
    return (
      <MDBContainer className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  if (error) return <div>{error}</div>;
  if (!lecture) return <div>No lecture found</div>;

  return (
    <MDBContainer className='py-5'>
      <MDBCard className='shadow-3'>
        <MDBCardBody>
          <MDBCardTitle className='h2 mb-4'>{lecture.title}</MDBCardTitle>
          <MDBCardText className='text-muted mb-4'>
            <strong>Description: </strong>{lecture.description}
          </MDBCardText>
          <MDBCardText className='mb-4'>
            <MDBIcon fas icon="clock" className='me-2'/>
            <strong>Duration: </strong>{lecture.duration} minutes
          </MDBCardText>
          
          {user && user.role === 'admin' && (
            <MDBBtn color="danger" onClick={() => alert('Delete functionality not implemented yet')} className='mb-4'>
              <MDBIcon fas icon="trash" className='me-2'/> Delete Lecture
            </MDBBtn>
          )}
          {videoId ? (
            <div className='mt-4'>
              <div className="ratio ratio-16x9" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Video for ${lecture.title}`}
                  frameBorder="0"
                  style={{ width: '100%', height: '315px' }} // Adjust height here
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <MDBCardText>
                <strong>Video Link: </strong>{lecture.video}
              </MDBCardText>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LectureDetail;
