import { useQuery } from "@tanstack/react-query";

export const useTQLeaderboard = () => {
  return useQuery({
    queryKey: ["TQLeaderboard"],
    queryFn: async () => {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return [
        {
          users: [
            {
              image: "Druid1",
              title: "Rusty Crab",
              titleRarity: "Legendary",
              name: "John",
              guildName: "Warriors of Light",
              username: "John_Doe",
              lastname: "Doe",
              schoolClass: "1IM1",
              level: 100,
              xp: 100000,
            },
            {
              image: "Druid2",
              title: "Epic Hero",
              titleRarity: "Epic",
              name: "Jane",
              guildName: "Mages of the Arcane",
              username: "Jane_Smith",
              lastname: "Smith",
              schoolClass: "1IM2",
              level: 90,
              xp: 90000,
            },
            {
              image: "Druid3",
              title: "Rare Adventurer",
              titleRarity: "Rare",
              name: "Doe",
              guildName: "Rogues of the Shadows",
              username: "Shadow_Rogue",
              lastname: "Doe",
              schoolClass: "1IM3",
              level: 80,
              xp: 80000,
            },
          ],
          title: "VG1",
        },
        {
          users: [
            {
              image: "Druid1",
              title: "Chosen Champion",
              titleRarity: "Legendary",
              name: "Martin",
              guildName: "Microwave Enthusiasts",
              username: "Mr_Drift",
              lastname: "Lyse",
              schoolClass: "2IT2",
              level: 101,
              xp: 101623,
            },
            {
              image: "Druid2",
              title: "Epic Hero",
              titleRarity: "Epic",
              name: "Alice",
              guildName: "Dragon Slayers",
              username: "Dragon_Lord",
              lastname: "Smith",
              schoolClass: "2IT1",
              level: 95,
              xp: 95432,
            },
            {
              image: "Druid3",
              title: "Rare Adventurer",
              titleRarity: "Rare",
              name: "Bob",
              guildName: "Shadow Hunters",
              username: "Shadow_Blade",
              lastname: "Johnson",
              schoolClass: "2MP1",
              level: 88,
              xp: 88210,
            },
          ],
          title: "VG2",
        },
      ];
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};
