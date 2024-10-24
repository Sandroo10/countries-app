// src/utils/locales.ts

type Translations = {
    [key: string]: {
      labels: {
        countryName: string;
        countryNamePlaceholder: string;
        population: string;
        populationPlaceholder: string;
        capital: string;
        capitalPlaceholder: string;
        image: string;
        addCountry: string;
      };
      errors: {
        invalidGeorgian: string;
        invalidEnglish: string;
        invalidImage: string;
        imageConversionFailed: string;
      };
    };
  };
  
  export const translations: Translations = {
    en: {
      labels: {
        countryName: 'Country Name',
        countryNamePlaceholder: 'Enter country name',
        population: 'Population',
        populationPlaceholder: 'Enter population',
        capital: 'Capital',
        capitalPlaceholder: 'Enter capital',
        image: 'Country Image',
        addCountry: 'Add Country',
      },
      errors: {
        invalidGeorgian: 'Please enter valid Georgian letters.',
        invalidEnglish: 'Please enter valid English letters.',
        invalidImage: 'Invalid image format. Please use .jpg or .png.',
        imageConversionFailed: 'Image conversion failed. Please try again.',
      },
    },
    ge: {
      labels: {
        countryName: 'ქვეყნის სახელი',
        countryNamePlaceholder: 'შეიყვანეთ ქვეყნის სახელი',
        population: 'მოსახლეობა',
        populationPlaceholder: 'შეიყვანეთ მოსახლეობა',
        capital: 'დედაქალაქი',
        capitalPlaceholder: 'შეიყვანეთ დედაქალაქი',
        image: 'ქვეყნის სურათი',
        addCountry: 'ქვეყნის დამატება',
      },
      errors: {
        invalidGeorgian: 'გთხოვთ შეიყვანოთ ქართული ასოები.',
        invalidEnglish: 'გთხოვთ შეიყვანოთ ინგლისური ასოები.',
        invalidImage: 'არასწორი სურათის ფორმატი. გამოიყენეთ .jpg ან .png.',
        imageConversionFailed: 'სურათის კონვერტაცია წარუმატებელია. გთხოვთ, სცადეთ ხელახლა.',
      },
    },
    // Add more languages as needed
  };
  
  export const getTranslation = (lang: string) => translations[lang] || translations.en;
  