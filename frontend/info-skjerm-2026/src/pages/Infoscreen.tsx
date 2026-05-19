import { BusRotator, AnnouncmentRotator } from "../components/ContentRotator";
// import WeatherDisplay from "../components/WeatherDisplay";
import DateAndTimeDisplay from "../components/DateAndTimeDisplay";
import Paper from "@mui/material/Paper";

function InfoScreen() {
  return (
    <table className="flex flex-row w-screen h-screen p-5">
      <tr className="flex flex-col w-3/4 h-full pr-5">
        {/* Weather & Time */}
        <Paper
          sx={{
            backgroundColor: "#1e2227",
            height: "25%",
            textAlign: "center",
            color: "#e2e2e2",
            marginBottom: "1.25rem",
            padding: "1rem",
          }}
          variant="elevation"
          elevation={24}
          square={false}
        >
          <DateAndTimeDisplay />
          <p>Weather</p>
          {/* <WeatherDisplay /> */}
        </Paper>
        {/* TillerQuest & Announcements */}
        <Paper
          sx={{
            backgroundColor: "#1e2227",
            height: "75%",
            textAlign: "center",
            color: "#e2e2e2",
            padding: "1rem",
          }}
          variant="elevation"
          elevation={24}
          square={false}
        >
          <AnnouncmentRotator />
        </Paper>
      </tr>

      {/* Busses */}
      <tr className="w-1/4">
        <Paper
          sx={{
            backgroundColor: "#1e2227",
            width: "100%",
            height: "100%",
            textAlign: "center",
            color: "#e2e2e2",
            padding: "1rem",
          }}
          variant="elevation"
          elevation={24}
          square={false}
        >
          <BusRotator />
        </Paper>
      </tr>
    </table>
  );
}

export default InfoScreen;