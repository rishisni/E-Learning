import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useCourseContext } from '../../context/CourseContext.js'; // Import useCourseContext

const StatsPage = () => {
  const { stats, fetchStats } = useCourseContext(); // Use context to get stats and fetchStats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStats(); // Call fetchStats from context
      } catch (err) {
        setError('Failed to fetch stats');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchStats]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MDBContainer className='py-5'>
      <MDBRow>
        <MDBCol md='4' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Total Courses</MDBCardTitle>
              <MDBCardText>{stats.totalCourses || 'N/A'}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Total Lectures</MDBCardTitle>
              <MDBCardText>{stats.totalLectures || 'N/A'}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Total Users</MDBCardTitle>
              <MDBCardText>{stats.totalUsers || 'N/A'}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default StatsPage;
