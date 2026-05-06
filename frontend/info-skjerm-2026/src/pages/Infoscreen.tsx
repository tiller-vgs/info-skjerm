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
