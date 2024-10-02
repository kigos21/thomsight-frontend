import axiosInstance from "../services/axiosInstance";

export const getAnnouncements = async () => {
  const response = await axiosInstance.get("/api/announcements");
  return response.data;
};

export const createAnnouncement = async (subject: string, details: string) => {
  try {
    const response = await axiosInstance.post("/api/announcements/create", {
      subject,
      details,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating announcement: " + error);
  }
};

export const deleteAnnouncement = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/announcements/${id}/delete`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting announcement: " + error);
  }
};
