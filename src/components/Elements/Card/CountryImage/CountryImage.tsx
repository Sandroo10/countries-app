import React from "react";
import styles from "./CountryImage.module.css";

interface CountryImageProps {
  image: string;
  name: string;
}

const CountryImage: React.FC<CountryImageProps> = ({ image, name }) => (
  <div className={styles.countryImageContainer}>
    <img src={image} alt={name} className={styles.countryImage} />
  </div>
);

export default CountryImage;
