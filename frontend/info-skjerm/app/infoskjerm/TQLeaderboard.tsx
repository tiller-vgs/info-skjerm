import { useEffect, useState, useTransition } from "react";
import { LeaderboardData } from "@/types";
import { getTQLeaderboard } from "@/actions";
import LeaderboardComponent from "./LeaderboardComponent";

export function TQLeaderboard() {
  const [leaderboardDataVg1, setLeaderboardDataVg1] =
    useState<LeaderboardData>();
  const [leaderboardDataVg2, setLeaderboardDataVg2] =
    useState<LeaderboardData>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchLeaderboard = () => {
    startTransition(async () => {
      let leaderboardDataVg1 = await getTQLeaderboard("vg1");
      setLeaderboardDataVg1(leaderboardDataVg1);
      let leaderboardDataVg2 = await getTQLeaderboard("vg2");
      setLeaderboardDataVg2(leaderboardDataVg2);
    });
  };

  useEffect(() => {
    if (firstRender) {
      fetchLeaderboard();
      setFirstRender(false);
    }
    setInterval(() => {
      if (new Date().getHours() === 12) {
        fetchLeaderboard();
      }
    }, 1000 * 60); // fetch every minute
  }, []);

  return (
    <div className="border-2 border-slate-500 rounded-lg flex items-center justify-center p-2">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-evenly w-full gap-2">
          <LeaderboardComponent
            title="Vg1"
            leaderboardData={leaderboardDataVg1}
          />
          <LeaderboardComponent
            title="Vg2"
            leaderboardData={leaderboardDataVg2}
          />
        </div>
      )}
    </div>
  );
}
