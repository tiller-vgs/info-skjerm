// import Bus from "../components/Bus";
// import Clock from "../components/Clock";
import { BusRotator, AnnouncmentRotator } from "../components/ContentRotator";
// import DateDisplay from "../components/DateDisplay";
import WeatherDisplay from "../components/WeatherDisplay";
import busIcon from "../Icon/bus.png";
import DateAndTimeDisplay from "../components/DateAndTimeDisplay";

function InfoScreen() {
  return (
    <table className="bg-tqboxes border-10 w-screen h-screen border-tqbackground">
      <tr>
        {/* Weather & Time */}
        <td className="bg-tqboxes border-b-10 border-l-10 h-1/4 border-tqbackground">
          <DateAndTimeDisplay />
          <WeatherDisplay />
        </td>
        {/* Busses */}
        <td
          rowSpan={2}
          className="border-l-10 w-1/4 border-tqbackground align-top text-center p-4"
        >
          <img src={busIcon} alt="bus" width={150} className="inline-block" />
          <BusRotator />
        </td>
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
// // import DateDisplay from "../components/DateDisplay";
// import WeatherDisplay from "../components/WeatherDisplay";
// import busIcon from "../Icon/bus.png";
// import DateAndTimeDisplay from "../components/DateAndTimeDisplay";
// import Paper from "@mui/material/Paper";

// function InfoScreen() {
//   return (
//     <Paper className="flex flex-row bg-tqboxes w-screen h-screen ">
//       <div className="flex flex-col w-3/4">
//         {/* Weather & Time */}
//         <div className="bg-tqboxes h-1/4 ">
//           <DateAndTimeDisplay />
//           <WeatherDisplay />
//         </div>

//         {/* TillerQuest & Announcements */}
//         <div>
//           {/* <td className="border-t-10 border-l-10 border-tqbackground"> */}
//           <AnnouncmentRotator />
//           {/* </td> */}
//         </div>
//       </div>

//       {/* Busses */}
//       <div
//         // rowSpan={2}
//         className=" w-1/4 border-tqbackground align-top text-center p-4"
//       >
//         {/* <img src={busIcon} alt="bus" width={150} className="inline-block" /> */}
//         <BusRotator />
//       </div>
//     </Paper>
//   );
// }

// export default InfoScreen;