import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { translations } from "@/data/translations";

const Header: React.FC = () => {
  const { lang } = useParams();
  const navigate = useNavigate();

  const switchLanguage = () => {
    const newLang = lang === "en" ? "ka" : "en";
    const currentPath = window.location.pathname.replace(
      `/${lang}`,
      `/${newLang}`,
    );
    navigate(currentPath);
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>CoolestSite</h1>
      </div>
      <div className={styles.headerRight}>
        <Link to={`/`} className={styles.linkButton}>
          {t.home}
        </Link>
        <Link to={`list`} className={styles.linkButton}>
          {t.list}
        </Link>
        <Link to={`test`} className={styles.linkButton}>
          {t.test}
        </Link>
        <Link to={`about`} className={styles.linkButton}>
          {t.about}
        </Link>
        <Link to={`contact`} className={styles.linkButton}>
          {t.contact}
        </Link>
        <button onClick={switchLanguage} className={styles.linkButton}>
          {lang === "en" ? "EN" : "KA"}
        </button>
      </div>
    </header>
  );
};

export default Header;
