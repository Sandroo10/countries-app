import React, { useState } from "react";
import { Country } from "@/data/Countries";
import styles from "./List.module.css";
import { translations } from "@/data/translations";
import { useParams } from "react-router-dom";


type CountryFormProps = {
  onAddCountry: (country: Country) => void;
};

const CountryForm: React.FC<CountryFormProps> = ({ onAddCountry }) => {
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [newCountry, setNewCountry] = useState({
    nameGeorgian: "",
    nameEnglish: "",
    capitalGeorgian: "",
    capitalEnglish: "",
    population: "",
    image: "" as string | null,
  });

  const [errors, setErrors] = useState({
    nameGeorgian: "",
    nameEnglish: "",
    image: "",
  });
  const [isImageConverted, setIsImageConverted] = useState(false);

  const georgianRegex = /^[\u10A0-\u10FF]+$/;
  const englishRegex = /^[A-Za-z]+$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setNewCountry((prevCountry) => ({
        ...prevCountry,
        [name]: value,
      }));
      return;
    }

    if (name === "nameGeorgian" || name === "capitalGeorgian") {
      if (!georgianRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid Georgian characters",
        }));
        return;
      }
    }

    if (name === "nameEnglish" || name === "capitalEnglish") {
      if (!englishRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid English characters",
        }));
        return;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [name]: value,
    }));
  };

  const convertToBase64 = (selectedFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      console.log("Base64 conversion successful:", reader.result);
      setNewCountry((prevCountry) => ({
        ...prevCountry,
        image: reader.result as string,
      }));
      setIsImageConverted(true);
    };

    reader.onerror = () => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image conversion failed. Please try again.",
      }));
      setIsImageConverted(false);
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Invalid image type",
        }));
        return;
      }

      convertToBase64(file);
    }
  };

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      errors.nameGeorgian ||
      errors.nameEnglish ||
      errors.image ||
      !isImageConverted
    ) {
      console.log(
        "Form submission blocked due to errors or pending image conversion.",
      );
      return;
    }

    const newCountryData: Country = {
      id: String(Date.now()),
      name: newCountry.nameEnglish,
      population: Number(newCountry.population),
      capital: newCountry.capitalEnglish,
      likes: 0,
      image: newCountry.image as string,
      isDeleted: false,
      nameGeorgian: newCountry.nameGeorgian,
      capitalGeorgian: newCountry.capitalGeorgian,
    };

    

    onAddCountry(newCountryData);
    setNewCountry({
      nameGeorgian: "",
      nameEnglish: "",
      capitalGeorgian: "",
      capitalEnglish: "",
      population: "",
      image: null,
    });
    setIsImageConverted(false);
  };

  return (
    <form onSubmit={handleAddCountry} className={styles.addForm}>
      <div className={styles.formGroup}>
        <label>{t.countryNameGeorgian}</label>
        <input
          type="text"
          name="nameGeorgian"
          placeholder="Enter Georgian name"
          value={newCountry.nameGeorgian}
          onChange={handleInputChange}
        />
        {errors.nameGeorgian && (
          <p className={styles.error}>{errors.nameGeorgian}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>{t.countryNameEnglish}</label>
        <input
          type="text"
          name="nameEnglish"
          placeholder="Enter English name"
          value={newCountry.nameEnglish}
          onChange={handleInputChange}
        />
        {errors.nameEnglish && (
          <p className={styles.error}>{errors.nameEnglish}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>{t.capitalGeorgian}</label>
        <input
          type="text"
          name="capitalGeorgian"
          placeholder="Enter Georgian capital"
          value={newCountry.capitalGeorgian}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t.capitalEnglish}</label>
        <input
          type="text"
          name="capitalEnglish"
          placeholder="Enter English capital"
          value={newCountry.capitalEnglish}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t.population}</label>
        <input
          type="number"
          name="population"
          placeholder="Enter population"
          value={newCountry.population}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t.image} </label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </div>

      <button
        type="submit"
        disabled={
          !!errors.nameGeorgian ||
          !!errors.nameEnglish ||
          !!errors.image ||
          !isImageConverted
        }
      >
        {t.labels.addCountry}
      </button>
    </form>
  );
};

export default CountryForm;
