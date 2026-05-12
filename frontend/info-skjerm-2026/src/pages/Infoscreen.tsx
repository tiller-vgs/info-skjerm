// import Bus from "../components/Bus";
// import Clock from "../components/Clock";
import { BusRotator, AnnouncmentRotator } from "../components/ContentRotator";

// import WeatherDisplay from "../components/WeatherDisplay";
import busIcon from "../Icon/bus.png";
import DateAndTimeDisplay from "../components/DateAndTimeDisplay";
import Paper from "@mui/material/Paper";

function InfoScreen() {
  return (
    <table className="bg-tqboxes border-10 w-screen h-screen border-tqbackground">
      <tr>
        {/* Weather & Time */}
        <td className="bg-tqboxes border-b-10 border-l-10 h-1/4 border-tqbackground">
          <DateAndTimeDisplay />
          <p>Weather</p>
          {/* <WeatherDisplay /> */}
        </td>
        {/* Busses */}
        <Paper
          // rowSpan={2}
          className="border-l-10 w-1/4 border-tqbackground align-top text-center p-4"
        >
          <img src={busIcon} alt="bus" width={150} className="inline-block" />
          <BusRotator />
        </Paper>
      </tr>
      {/* TillerQuest & Announcements */}
      <tr>
        <td className="border-t-10 border-l-10 border-tqbackground">
          <AnnouncmentRotator />
        </td>
      </tr>
    </table>
  );
}

export default InfoScreen;


// // import Bus from "../components/Bus";
// // import Clock from "../components/Clock";
// import { BusRotator, AnnouncmentRotator } from "../components/ContentRotator";

// // import WeatherDisplay from "../components/WeatherDisplay";
// import busIcon from "../Icon/bus.png";
// import DateAndTimeDisplay from "../components/DateAndTimeDisplay";
// import Paper from "@mui/material/Paper";

// function InfoScreen() {
//   return (
//     <div className="bg-tqboxes border-10 w-screen h-screen border-tqbackground">
//       <div>
//         {/* Weather & Time */}
//         <Paper className="bg-tqboxes border-b-10 border-l-10 h-1/4 border-tqbackground">
//           <DateAndTimeDisplay />
//           <p>Weather</p>
//           {/* <WeatherDisplay /> */}
//         </Paper>
//         {/* Busses */}
//         <Paper
         
//           className="border-l-10 w-1/4 border-tqbackground align-top text-center p-4"
//         >
//           <img src={busIcon} alt="bus" width={150} className="inline-block" />
//           <BusRotator />
//         </Paper>
//       </div>
//       {/* TillerQuest & Announcements */}
//       <Paper>
//         <td className="border-t-10 border-l-10 border-tqbackground">
//           <AnnouncmentRotator />
//         </td>
//       </Paper>
//     </div>
//   );
// }

// export default InfoScreen;