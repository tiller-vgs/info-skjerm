import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { TQLeaderboardUser, TQLeaderboardYear } from "../types/types";
import { useTQLeaderboard } from "../hooks/tQLeaderboardDummydata";

function TQLeaderboard() {
  const { data: years, isError, isLoading, isPending } = useTQLeaderboard();

  if (isError) {
    return <div>Feil ved lasting av kunngjøringer.</div>;
  }

  if (isLoading || isPending) {
    return <div>Laster in kunngjøringer...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {years?.map((year: TQLeaderboardYear) => (
        <div className="flex flex-col justify-start items-center h-full w-full">
          <Typography variant="h4" component={"h2"}>
            {year.title}
          </Typography>
          <TableContainer
            sx={{ width: "100%" }}
            component={Paper}
            elevation={2}
            className="p-3 my-2"
          >
            <Table aria-label="leaderboard">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    User
                  </TableCell>
                  <TableCell align="center">XP</TableCell>
                  <TableCell align="center">Level</TableCell>
                  <TableCell align="center">Guild</TableCell>
                  <TableCell align="center">Schoolclass</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {year.users?.map((user: TQLeaderboardUser) => (
                  <TableRow
                    key={user.username}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <div className="flex justify-center w-28 h-28 m-auto self-center from-zinc-600 to-zinc-700 bg-radial p-1.5 rounded-full">
                        <img
                          src={`https://tillerquest.tiller.blog/classes/${user.image}.png`}
                        />
                      </div>
                    </TableCell>
                    <TableCell sx={{ fontSize: "125%" }} align="center">
                      <div className="flex flex-col text-purple-400 text-center text-lg items-center ">
                        {user.title}
                        <Typography>{user.name}</Typography>
                        <Typography variant="h6" color="Highlight">
                          &quot;{user.username}&quot;
                        </Typography>
                        <Typography>{user.lastname}</Typography>
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "125%", color: "lightgreen" }}
                      align="center"
                    >
                      {user.xp}
                    </TableCell>
                    {/* <TableCell sx={{ fontSize: "125%" }} align="center">
                  {user.class}
                </TableCell> */}
                    <TableCell sx={{ fontSize: "125%" }} align="center">
                      {user.level}
                    </TableCell>
                    <TableCell sx={{ fontSize: "125%" }} align="center">
                      {user.guildName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "125%" }} align="center">
                      {user.schoolClass}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
}

export default TQLeaderboard;
