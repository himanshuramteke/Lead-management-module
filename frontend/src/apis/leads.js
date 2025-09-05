import { axiosInstance } from "./axios";

export const getAllLeads = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.log("Error in getAllLeads api", error);
    throw error;
  }
};

export const getLead = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error in getLead api", error);
    throw error;
  }
};

export const createLead = async (data) => {
  try {
    const response = await axiosInstance.post("/", data);
    return response.data;
  } catch (error) {
    console.log("Error in create Lead api", error);
    throw error;
  }
};

export const updateLead = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error in update lead api", error);
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error in delete lead api", error);
    throw error;
  }
};
