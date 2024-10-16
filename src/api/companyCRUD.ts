import axiosInstance from "../services/axiosInstance";

export const updateCompanyInfo = async (
  slug: string,
  updatedData: {
    description: string;
    industry: string;
    size: string;
  }
) => {
  try {
    const response = await axiosInstance.put(
      `/api/company/${slug}/edit`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating company data: " + error);
  }
};

export const addLocation = async (slug: string, address: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/company/${slug}/location/create`,
      { address }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding location: " + error);
  }
};

export const updateLocation = async (
  slug: string,
  locationId: number,
  address: string
) => {
  try {
    const response = await axiosInstance.put(
      `/api/company/${slug}/location/${locationId}/edit`,
      { address }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating location: " + error);
  }
};

export const deleteLocation = async (slug: string, locationId: number) => {
  try {
    await axiosInstance.delete(
      `/api/company/${slug}/location/${locationId}/delete`
    );
  } catch (error) {
    console.error("Error deleting location: " + error);
  }
};

export const addJob = async (
  slug: string,
  jobData: { title: string; description: string }
) => {
  try {
    const response = await axiosInstance.post(
      `/api/company/${slug}/jobs/create`,
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating job: " + error);
  }
};

export const updateJob = async (
  slug: string,
  jobId: number,
  jobData: { title: string; description: string }
) => {
  try {
    const response = await axiosInstance.put(
      `/api/company/${slug}/job/${jobId}/edit`,
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job: " + error);
  }
};

export const deleteJob = async (slug: string, jobId: number) => {
  try {
    await axiosInstance.delete(`/api/company/${slug}/job/${jobId}/delete`);
  } catch (error) {
    console.error("Error deleting job: " + error);
  }
};
