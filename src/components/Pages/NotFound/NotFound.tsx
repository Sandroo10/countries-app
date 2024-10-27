import React from "react";
import styles from "./NotFound.module.css";
import notFoundImage from "@/assets/NotFound.jpg";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.notFoundTitle}>404 - Page Not Found</h2>
      <p className={styles.notFoundText}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src={notFoundImage}
        alt="Not Found"
        className={styles.notFoundImage}
      />
    </div>
  );
};

export default NotFound;
