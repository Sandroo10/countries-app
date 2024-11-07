import React, { useState } from "react";
import { Country } from "@/data/Countries";

type EditCountryFormProps = {
  country: Country;
  onSave: (updatedCountry: Country) => void;
  onCancel: () => void;
};

const EditCountryForm: React.FC<EditCountryFormProps> = ({
  country,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Country>(country);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertToBase64 = (selectedFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = () => {
        console.log("Base64 conversion successful:", reader.result);
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        console.error("Image conversion failed. Please try again.", error);
        reject(new Error("Image conversion failed."));
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        console.log("Invalid image type");
        return;
      }

      try {
        const base64Image = await convertToBase64(file);
        setFormData((prevData) => ({
          ...prevData,
          image: base64Image,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error converting image:", error.message);
        } else {
          console.log("Error converting image:", error);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="population"
        value={formData.population}
        onChange={handleChange}
        placeholder="Population"
      />
      <input
        type="text"
        name="likes"
        value={formData.likes}
        onChange={handleChange}
        placeholder="Likes"
      />
      <input
        type="text"
        name="capital"
        value={formData.capital}
        onChange={handleChange}
        placeholder="Capital"
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditCountryForm;
