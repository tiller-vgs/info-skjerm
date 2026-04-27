import Bus from "../components/Bus";
import Clock from "../components/Clock";
import DateDisplay from "../components/DateDisplay";

function Infoskjerm() {
  return (
    <table className="w-screen h-screen bg-background">
      <tr>
        <td rowSpan={2} className="border-r-4 w-1/4 border-[#6e40c9]">
          <Bus />
        </td>
        <td className="border-b-4 border-l-4 h-1/4 border-[#6e40c9]">
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
        <td className="border-t-4 border-l-4 border-[#6e40c9]"></td>
      </tr>
    </table>
  );
}

export default Infoskjerm;
