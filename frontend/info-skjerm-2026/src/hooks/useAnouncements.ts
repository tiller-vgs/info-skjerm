import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AnnouncementType } from "@types";

const StaleTime = 1000 * 60 * 5; // 5 minutt
export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["getAnnouncements"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
      );
      if (!response.ok) {
        console.log(response.status, response.statusText);
        throw new Error(response.statusText);
      }
      const AnnouncementList = (await response.json()) as AnnouncementType[];
      return AnnouncementList;
    },
    staleTime: StaleTime,
  });
};

export const useAnnouncementMutations = () => {
  const queryClient = useQueryClient();

  const invalidateAnnouncements = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAnnouncements"] });
  };

  const createAnnouncement = useMutation({
    mutationFn: async (announcementObject: AnnouncementType) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(announcementObject),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return (await response.json()) as string;
    },
    onSuccess: invalidateAnnouncements,
  });

  const updateAnnouncement = useMutation({
    mutationFn: async (announcementObject: AnnouncementType) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(announcementObject),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return (await response.json()) as string;
    },
    onSuccess: invalidateAnnouncements,
  });

  const deleteAnnouncement = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return (await response.json()) as string;
    },
    onSuccess: invalidateAnnouncements,
  });

  return { createAnnouncement, updateAnnouncement, deleteAnnouncement };
};
