import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useCourseContext } from '../../context/CourseContext.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddLecture = () => {
  const { addLecture, selectedCourse } = useCourseContext();
  const [lectureData, setLectureData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  if (!selectedCourse) {
    return <div>Please select a course to add a lecture.</div>;
  }

  const handleChange = (e) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addLecture(selectedCourse._id, {
        title: lectureData.title,
        description: lectureData.description,
        duration: lectureData.duration,
        videoUrl: lectureData.youtubeUrl,
      });
      setMessage('Lecture added successfully!');
      setLectureData({
        title: '',
        description: '',
        youtubeUrl: '',
        duration: '',
      });
      // Redirect to the course detail page after successful addition
      navigate(`/course/${selectedCourse._id}`);
    } catch (err) {
      setError('Failed to add lecture');
      console.error('Failed to add lecture:', err);
    }
  };

  return (
    <MDBContainer className='py-5'>
      <MDBRow>
        <MDBCol md='8' className='offset-md-2'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Add Lecture</MDBCardTitle>
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label='Title'
                  name='title'
                  value={lectureData.title}
                  onChange={handleChange}
                  className='mb-3'
                  required
                />
                <MDBInput
                  label='Description'
                  name='description'
                  value={lectureData.description}
                  onChange={handleChange}
                  className='mb-3'
                  required
                />
                <MDBInput
                  label='YouTube URL'
                  name='youtubeUrl'
                  value={lectureData.youtubeUrl}
                  onChange={handleChange}
                  className='mb-3'
                  required
                />
                <MDBInput
                  label='Duration (minutes)'
                  name='duration'
                  type='number'
                  value={lectureData.duration}
                  onChange={handleChange}
                  className='mb-3'
                  required
                />
                <MDBBtn type='submit' color='primary'>
                  Add Lecture
                </MDBBtn>
              </form>
              {lectureData.youtubeUrl && (
                <div className="mt-4">
                  <h5>Preview:</h5>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${lectureData.youtubeUrl.split('v=')[1]?.split('&')[0]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddLecture;
