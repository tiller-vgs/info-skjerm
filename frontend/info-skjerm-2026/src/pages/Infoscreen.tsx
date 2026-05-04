import Bus from "../components/Bus";
import Clock from "../components/Clock";
import DateDisplay from "../components/DateDisplay";
import WeatherDisplay from "../components/WeatherDisplay";
import busIcon from "../Icon/bus.png";

function InfoScreen() {
  return (
    <table className="w-screen h-screen bg-background">
      <tr>
        <td className="border-b-10 border-r-10 h-1/4 border-[#21252b]">
          <table className="w-full h-full">
            <tr>
              <td className="w-1/2">
                <Clock />
              </td>
              <td className="w-1/2">
                <DateDisplay />
              </td>
            </tr>
          </table>
          <WeatherDisplay />
        </td>
        <td
          rowSpan={2}
          className="border-l-10 w-1/4 border-[#21252b] align-top text-center p-4"
        >
          <img src={busIcon} alt="bus" width={100} className="inline-block" />
          <Bus />
        </td>
      </tr>
      <tr>
        <td className="border-t-10 border-r-10 border-[#21252b]"></td>
      </tr>
    </table>
  );
}

export default InfoScreen;
