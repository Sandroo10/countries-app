import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Discover Ibiza</h1>
        <p>
          Ibiza, the party capital of the world, is known for its stunning beaches, vibrant nightlife, and breathtaking sunsets. Explore the hidden coves, luxurious resorts, and world-famous clubs that make Ibiza an unforgettable destination.
        </p>
      </div>
    </section>
  );
};

export default Hero;
