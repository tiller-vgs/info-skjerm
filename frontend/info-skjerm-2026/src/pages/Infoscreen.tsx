// import BusRoute from "../components/BusRoute";
import { BusRotator, AnnouncmentRotator } from "../components/ContentRotator";
// import WeatherDisplay from "../components/WeatherDisplay";
import DateAndTimeDisplay from "../components/DateAndTimeDisplay";
import Paper from "@mui/material/Paper";
// import WeatherBoxBox from "../components/WeatherBoxBox";

function InfoScreen() {
  return (
    <div className="flex flex-row w-screen h-screen p-5">
      <div className="flex flex-col w-3/4 h-full pr-5">
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
          {/*
          <p>Weather</p>
          <WeatherBoxBox />
          <WeatherDisplay /> */}
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
      </div>

      {/* Busses */}
      <Paper
        sx={{
          backgroundColor: "#1e2227",
          width: "25%",
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
    </div>
  );
}

export default InfoScreen;
