import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <h1 className={styles.aboutTitle}>About Us</h1>
      <p className={styles.aboutText}>
        Founded in 2024, our company has rapidly become a leader in the travel industry, known for delivering unforgettable experiences to adventurers worldwide. With a passion for exploring the hidden gems of the world, we aim to provide travelers with exclusive insights, personalized itineraries, and a seamless booking experience.
      </p>
      <p className={styles.aboutText}>
        Whether you're seeking luxury, adventure, or a combination of both, we have the expertise and dedication to craft the perfect journey for you. Our team consists of seasoned travel enthusiasts who have explored every corner of the globe, ensuring that our recommendations are authentic and well-curated.
      </p>
      <p className={styles.aboutText}>
        In just a short time, we’ve built a reputation as the best in the business, helping thousands of clients turn their travel dreams into reality. Join us as we continue to redefine the way people travel, offering unique experiences that go beyond traditional vacations.
      </p>
    </section>
  );
};

export default About;
