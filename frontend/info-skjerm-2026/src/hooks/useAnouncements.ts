import { useQuery } from "@tanstack/react-query";
import type { AnnouncementType } from "@types";

const StaleTime = 1000 * 60 * 5; // 5 minutt
export const getAnnouncements = () => {
  return useQuery({
    queryKey: ["getAnnouncements"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
      );
      if (response.statusText !== "OK") {
        console.log(response.status, response.statusText);
        return response.statusText;
      }
      const AnnouncementList = (await response.json()) as AnnouncementType[];
      return AnnouncementList;
    },
    staleTime: StaleTime,
  });
};

// Change text to everything needed to make a anouncement object
export const putAnnouncements = (AnnouncementObject: AnnouncementType) => {
  return useQuery({
    queryKey: ["putAnnouncements", AnnouncementObject],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(AnnouncementObject),
        },
      );
      console.log(response);
      if (!response.ok) {
        console.log(response.status, response.statusText);
        return response.statusText;
      }
      const PutAnnouncementConfirm = (await response.json()) as string;
      return PutAnnouncementConfirm;
    },
    staleTime: StaleTime,
  });
};

export const deleteAnnouncements = (id: number) => {
  return useQuery({
    queryKey: ["deleteAnnouncements"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );
      if (response.statusText !== "OK") {
        console.log(response.status, response.statusText);
        return response.statusText;
      }
      const DeleteAnnouncementConfirm = (await response.json()) as string;
      return DeleteAnnouncementConfirm;
    },
    staleTime: StaleTime,
  });
};
