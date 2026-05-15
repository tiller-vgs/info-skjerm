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
import { NavLink } from "react-router";

function TQLeaderboard() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <Typography variant="h4" component={"h2"}>
          {title}
        </Typography>
        <TableContainer
          sx={{ maxWidth: "50vw" }}
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
                {/* <TableCell align="center">Class</TableCell> */}
                <TableCell align="center">Level</TableCell>
                <TableCell align="center">Guild</TableCell>
                <TableCell align="center">Schoolclass</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: TQLeaderboardUser) => (
                <TableRow
                  key={user.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <NavLink
                      key={user.username}
                      href={"/profile/" + user.username}
                    >
                      <div className="flex justify-center w-28 h-28 m-auto self-center from-zinc-600 to-zinc-700 bg-radial p-1.5 rounded-full">
                        <img />
                      </div>
                    </NavLink>
                  </TableCell>
                  <TableCell sx={{ fontSize: "125%" }} align="center">
                    <NavLink
                      key={user.username}
                      href={"/profile/" + user.username}
                    >
                      <div className="flex flex-col text-purple-400 text-center text-lg items-center ">
                        <RarityText
                          rarity={user.titleRarity || "Common"}
                          width="full"
                        >
                          {user.title}
                        </RarityText>
                        <Typography>{user.name}</Typography>
                        <Typography variant="h6" color="Highlight">
                          &quot;{user.username}&quot;
                        </Typography>
                        <Typography>{user.lastname}</Typography>
                      </div>
                    </NavLink>
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
                    {user.schoolClass?.split("_")[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default TQLeaderboard;
