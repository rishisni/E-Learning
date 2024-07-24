import React, { useState } from 'react';
import { useCourseContext } from '../../context/CourseContext.js';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

const CreateCourse = () => {
  const { createCourse } = useCourseContext();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    createdBy: '',
    duration: '',
    price: '',
  });
  const [file, setFile] = useState(null); // Changed from image to file

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Changed from handleImageChange to handleFileChange
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('category', courseData.category);
    formData.append('createdBy', courseData.createdBy);
    formData.append('duration', courseData.duration);
    formData.append('price', courseData.price);
    formData.append('file', file); // Changed from 'image' to 'file'

    createCourse(formData);
  };

  return (
    <MDBContainer className='py-5'>
      <MDBRow>
        <MDBCol md='6' className='offset-md-3'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Create New Course</MDBCardTitle>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <MDBInput
                  label='Title'
                  name='title'
                  value={courseData.title}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  label='Description'
                  name='description'
                  value={courseData.description}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  label='Category'
                  name='category'
                  value={courseData.category}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  label='Created By'
                  name='createdBy'
                  value={courseData.createdBy}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  label='Duration'
                  name='duration'
                  value={courseData.duration}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  label='Price'
                  name='price'
                  value={courseData.price}
                  onChange={handleChange}
                  className='mb-3'
                />
                <MDBInput
                  type='file'
                  name='file' // Changed from 'image' to 'file'
                  onChange={handleFileChange}
                  className='mb-3'
                />
                <MDBBtn type='submit' color='primary'>
                  Create Course
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreateCourse;
