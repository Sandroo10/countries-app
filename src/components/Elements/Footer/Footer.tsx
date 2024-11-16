import React from "react";
import styles from "./Footer.module.css";
import facebookIcon from "@/assets/facebook.png";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactInfo}>
        <p>Contact Us: CoolSite@gmail.com | +995 995 995</p>
      </div>
      <div className={styles.socialMedia}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img
            src={facebookIcon}
            alt="Facebook"
            className={styles.socialIcon}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img
            src={facebookIcon}
            alt="Instagram"
            className={styles.socialIcon}
          />
        </a>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 Coolsite. Not all rights reserved :D.</p>
      </div>
    </footer>
  );
};

export default Footer;
