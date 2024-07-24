import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          
          <a className='btn btn-outline-light btn-floating m-1' href='https://instagram.com/rishi.sni/' role='button' target='_blank_'>
            <MDBIcon fab icon='instagram' />
          </a>
          <a className='btn btn-outline-light btn-floating m-1' href='https://www.linkedin.com/in/rishabhsaini04/' role='button' target='_blank_'>
            <MDBIcon fab icon='linkedin-in' />
          </a>
          <a className='btn btn-outline-light btn-floating m-1' href='https://github.com/rishisni/' role='button' target='_blank_'>
            <MDBIcon fab icon='github' />
          </a>
        </section>

        <section className='mb-4'>
          <p>
            Learning Adda is your one-stop solution for learning and teaching online. Explore our wide range of courses and join our community today!
          </p>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>About Us</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Our Story</a></li>
                <li><a href='#!' className='text-white'>Team</a></li>
                <li><a href='#!' className='text-white'>Careers</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Support</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Help Center</a></li>
                <li><a href='#!' className='text-white'>Contact Us</a></li>
                <li><a href='#!' className='text-white'>FAQs</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Legal</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Privacy Policy</a></li>
                <li><a href='#!' className='text-white'>Terms of Service</a></li>
                <li><a href='#!' className='text-white'>Cookie Policy</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Follow Us</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Facebook</a></li>
                <li><a href='#!' className='text-white'>Twitter</a></li>
                <li><a href='#!' className='text-white'>LinkedIn</a></li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Learning Adda. All rights reserved.
      </div>
    </MDBFooter>
  );
}

export default Footer;
