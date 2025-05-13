import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            VS Care is a comprehensive Hospital Management System (HMS) designed to streamline and digitize healthcare services within hospitals and clinics. This project was initiated with the goal of improving the efficiency, accessibility, and reliability of hospital operations through modern technology.

            The system facilitates various core functionalities such as patient registration, appointment scheduling, doctor and staff management, medical record handling, prescription management, and billing. Built with a user-friendly interface, VS Care ensures smooth interactions for both healthcare professionals and patients.

            Security, scalability, and performance are key focuses of the system. Sensitive medical and personal data are protected using secure login mechanisms and encryption methods, aligning with industry standards. Designed for high availability and real-time access, VS Care can handle concurrent usage by multiple users across departments without compromising performance.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>

          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
