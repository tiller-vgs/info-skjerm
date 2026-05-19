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
import { ThemeProvider } from "@mui/material/styles";
import type { TQLeaderboardUser } from "../types/types";
import {
  useTQLeaderboardVG1,
  useTQLeaderboardVG2,
} from "../hooks/useTQLeaderboard";
import { TillerQuestTheme } from "../lib/theme";
import RarityText from "./RarityText";
import { ScrollWindow } from "./ScrollWindow";

function TQLeaderboard() {
  const {
    data: vg1Data,
    isError: isErrorVG1,
    isLoading: isLoadingVG1,
    isPending: isPendingVG1,
  } = useTQLeaderboardVG1();
  const {
    data: vg2Data,
    isError: isErrorVG2,
    isLoading: isLoadingVG2,
    isPending: isPendingVG2,
  } = useTQLeaderboardVG2();

  return (
    <ThemeProvider theme={TillerQuestTheme}>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="flex flex-col justify-start items-center h-full w-full min-h-0">
          <Typography variant="h4" component={"h2"}>
            VG1
          </Typography>
          {isLoadingVG1 || isPendingVG1 || isErrorVG1 ? (
            isErrorVG1 ? (
              <div>Feil ved lasting av VG1 leaderboard.</div>
            ) : (
              <div>Laster inn VG1 leaderboard...</div>
            )
          ) : (
            <ScrollWindow
              startPause={2000}
              scrollTime={8000}
              endPause={2000}
              easeIn
              easeOut
              className="flex-1 min-h-0 w-full"
            >
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
                    {vg1Data?.users?.map((user: TQLeaderboardUser) => (
                      <TableRow
                        key={user.username}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <div className="flex justify-center w-28 h-28 m-auto self-center from-zinc-600 to-zinc-700 bg-radial p-1.5 rounded-full">
                            <img
                              className="rounded-full"
                              src={`https://tillerquest.tiller.blog/classes/${user.image}.png`}
                            />
                          </div>
                        </TableCell>
                        <TableCell sx={{ fontSize: "125%" }} align="center">
                          <div className="flex flex-col text-purple-400 text-center text-lg items-center ">
                            <RarityText
                              rarity={user.titleRarity || "Common"}
                              width="full"
                            >
                              {user.title}
                            </RarityText>
                            <Typography>{user.name}</Typography>
                            <Typography
                              variant="h6"
                              color="Highlight"
                              sx={{ color: "rgb(0, 120, 215)" }}
                            >
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
            </ScrollWindow>
          )}
        </div>
        <div className="flex flex-col justify-start items-center h-full w-full min-h-0">
          <Typography variant="h4" component={"h2"}>
            VG2
          </Typography>
          {isLoadingVG2 || isPendingVG2 || isErrorVG2 ? (
            isErrorVG2 ? (
              <div>Feil ved lasting av VG2 leaderboard.</div>
            ) : (
              <div>Laster inn VG2 leaderboard...</div>
            )
          ) : (
            <ScrollWindow
              startPause={2000}
              scrollTime={8000}
              endPause={2000}
              easeIn
              easeOut
              className="flex-1 min-h-0 w-full"
            >
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
                    {vg2Data?.users?.map((user: TQLeaderboardUser) => (
                      <TableRow
                        key={user.username}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <div className="flex justify-center w-28 h-28 m-auto self-center from-zinc-600 to-zinc-700 bg-radial p-1.5 rounded-full">
                            <img
                              className="rounded-full"
                              src={`https://tillerquest.tiller.blog/classes/${user.image}.png`}
                            />
                          </div>
                        </TableCell>
                        <TableCell sx={{ fontSize: "125%" }} align="center">
                          <div className="flex flex-col text-purple-400 text-center text-lg items-center ">
                            <RarityText
                              rarity={user.titleRarity || "Common"}
                              width="full"
                            >
                              {user.title}
                            </RarityText>
                            <Typography>{user.name}</Typography>
                            <Typography
                              variant="h6"
                              color="Highlight"
                              sx={{ color: "rgb(0, 120, 215)" }}
                            >
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
            </ScrollWindow>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default TQLeaderboard;
