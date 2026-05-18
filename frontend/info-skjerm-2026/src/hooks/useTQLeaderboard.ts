import { useQuery } from "@tanstack/react-query";

export const useTQLeaderboardVG1 = () => {
  return useQuery({
    queryKey: ["TQLeaderboardVG1"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tqleaderboard/vg1`,
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};

export const useTQLeaderboardVG2 = () => {
  return useQuery({
    queryKey: ["TQLeaderboardVG2"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tqleaderboard/vg2`,
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};
