import { LeaderboardData } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import RarityText from "@/components/RarityText";

export default function LeaderboardComponent({
  title,
  leaderboardData,
  rotationInterval = 15000, // 15 seconds by default, configurable
}: {
  title: string;
  leaderboardData: LeaderboardData | undefined | null;
  rotationInterval?: number;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  // Calculate total pages
  const totalUsers = leaderboardData?.users.length || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Get current page users
  const startIndex = currentPage * usersPerPage;
  const currentUsers =
    leaderboardData?.users.slice(startIndex, startIndex + usersPerPage) || [];

  // Auto rotation effect
  useEffect(() => {
    if (totalPages <= 1) return; // Don't rotate if only one page

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [totalPages, rotationInterval]);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-1/2">
        <h1 className="text-3xl mb-4">{title}</h1>

        {/* Page indicator */}
        {totalPages > 1 && (
          <div className="flex space-x-2 mb-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage ? "bg-yellow-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg p-4 my-2 max-w-4xl w-full overflow-x-auto">
          <table className="w-full">
            {/* <!-- Table Header --> */}
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-center py-2 px-1.5">Rank</th>
                <th className="text-center py-2 px-1.5"></th>
                <th className="text-center py-2 px-1.5">Bruker</th>
                <th className="text-center py-2 px-1.5 text-green-400">XP</th>
                <th className="text-center py-2 px-1.5">Level</th>
                <th className="text-center py-2 px-1.5 text-blue-400">Laug</th>
                <th className="text-center py-2 px-1.5">Klasse</th>
              </tr>
            </thead>

            {/* <!-- Table Body --> */}
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.name + user.id}
                  className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700 transition-colors"
                >
                  {/* <!-- User Image --> */}
                  <td className="text-center py-2">
                    <p className="text-3xl">
                      {startIndex + currentUsers.indexOf(user) + 1}
                    </p>
                  </td>

                  <td className="text-center py-2">
                    <div className="flex justify-center w-24 h-24 mx-auto bg-linear-to-r from-zinc-600 to-zinc-700 p-1.5 rounded-full">
                      <Image
                        className="rounded-full w-full h-full object-cover"
                        width={112}
                        height={112}
                        src={"/tillerquest/" + user.image + ".png"}
                        alt={user.image}
                        draggable="false"
                      />
                    </div>
                  </td>

                  {/* <!-- User Info --> */}
                  <td className="text-center py-2 px-2 text-lg">
                    <div className="flex flex-col text-center items-center space-y-1">
                      <RarityText rarity={user.titleRarity || "Common"}>
                        {user.title}
                      </RarityText>
                      <p className="text-white text-lg">{user.name}</p>
                    </div>
                  </td>

                  {/* <!-- XP --> */}
                  <td className="text-center py-2 mx-auto text-lg text-green-400 font-medium">
                    {user.xp}
                  </td>

                  {/* <!-- Level --> */}
                  <td className="text-center py-2 mx-auto text-lg text-white">
                    {user.level}
                  </td>

                  {/* <!-- Guild --> */}
                  <td className="text-center py-2 mx-auto text-lg text-blue-400">
                    {user.guildName}
                  </td>

                  {/* <!-- School className --> */}
                  <td className="text-center py-2 mx-auto text-lg text-white">
                    {user.schoolClass.replace("Class_", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
