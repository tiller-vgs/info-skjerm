import Bus from "../components/Bus";
import Clock from "../components/Clock";
import DateDisplay from "../components/DateDisplay";

function InfoScreen() {
  return (
    <table className="w-screen h-screen bg-background">
      <tr>
        <td rowSpan={2} className="border-r-10 w-1/4 border-[#21252b]">
          <Bus />
        </td>
        <td className="border-b-10 border-l-10 h-1/4 border-[#21252b]">
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
        </td>
      </tr>
      <tr>
        <td className="border-t-10 border-l-10 border-[#21252b]"></td>
      </tr>
    </table>
  );
}

export default InfoScreen;
