import axiosInstance from "./axiosInstance";
import { Country } from "@/data/Countries";

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axiosInstance.get<Country[]>("/countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchCountryById = async (id: string): Promise<Country | null> => {
  try {
    const response = await axiosInstance.get<Country | null>(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with ID ${id}:`, error);
    throw error;
  }
};

export const addCountry = async (country: Country): Promise<Country> => {
  try {
    const response = await axiosInstance.post<Country>("/countries", country);
    return response.data;
  } catch (error) {
    console.error("Error adding country:", error);
    throw error;
  }
};

export const updateCountry = async (country: Country): Promise<Country> => {
  try {
    const response = await axiosInstance.put<Country>(
      `/countries/${country.id}`,
      country
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating country with ID ${country.id}:`, error);
    throw error;
  }
};

export const deleteCountry = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete<void>(`/countries/${id}`);
  } catch (error) {
    console.error(`Error deleting country with ID ${id}:`, error);
    throw error;
  }
};
