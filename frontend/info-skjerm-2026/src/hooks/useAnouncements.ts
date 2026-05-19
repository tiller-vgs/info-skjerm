import { useQuery } from "@tanstack/react-query";
import type { AnnouncementType } from "@types";

const StaleTime = 1000 * 60 * 5; // 5 minutt
export const getAnnouncements = () => {
	return useQuery({
		queryKey: ["getAnnouncements"],
		queryFn: async () => {
            const response = await fetch(`http://localhost:3001/api/announcements`);
            if (response.status) {
                console.log(response.statusText);
                return;
            }
			const AnnouncementList = (await response.json()) as AnnouncementType[];
			return AnnouncementList;
		},
		staleTime: StaleTime,
	});
};
// Change text to everything needed to make a anouncement object
export const putAnnouncements = (text: string, overskrift: string) => {
	return useQuery({
		queryKey: ["putAnnouncements"],
		queryFn: async () => {
			const response = await fetch(`http://localhost:3001/api/announcements`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text, overskrift }),
			});
			if (response.status) {
				console.log(response.statusText);
				return;
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
			const response = await fetch(`http://localhost:3001/api/announcements`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
            });
            if (response.status) {
                console.log(response.statusText);
                return;
            }
			const DeleteAnnouncementConfirm = (await response.json()) as string;
			return DeleteAnnouncementConfirm;
		},
		staleTime: StaleTime,
	});
};
