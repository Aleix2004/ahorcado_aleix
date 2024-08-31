// src/register.js

import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import './register.css';

function Register() {
  return (
    <MDBContainer fluid className="register-container">
      <MDBCard className="register-card text-black">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='6' className='d-flex flex-column align-items-center'>
              <h1 className="register-header">Sign up</h1>
              <form className="register-form">
                <div className="d-flex flex-row align-items-center mb-4 register-input">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput label='Your Name' id='form1' type='text' className='w-100'/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 register-input">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput label='Your Email' id='form2' type='email'/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 register-input">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='Password' id='form3' type='password'/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 register-input">
                  <MDBIcon fas icon="key me-3" size='lg'/>
                  <MDBInput label='Repeat your password' id='form4' type='password'/>
                </div>
                <div className="register-checkbox">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                </div>
                <MDBBtn className="register-btn" size='lg'>Register</MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
