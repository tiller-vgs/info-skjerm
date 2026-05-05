import Bus from "../components/Bus";
import Clock from "../components/Clock";
import DateDisplay from "../components/DateDisplay";

function InfoScreen() {
  return (
    <table className="bg-tqboxes border-10 w-screen h-screen border-tqbackground">
      <tr>
        <td rowSpan={2} className="bg-tqboxes border-r-10 w-1/4 border-tqbackground">
          <Bus />
        </td>
        <td className="bg-tqboxes border-b-10 border-l-10 h-1/4 border-tqbackground">
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
