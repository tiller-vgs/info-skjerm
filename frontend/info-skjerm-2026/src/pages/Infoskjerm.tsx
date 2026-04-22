import Bus from "../components/Bus";
import Clock from "../components/Clock";

function Infoskjerm() {
  return (
    <table className="w-screen h-screen bg-background">
      <tr>
        <td rowSpan={2} className="border-r-4 w-1/4 border-[#6e40c9]">
          <Bus />
        </td>
        <td className="border-b-4 border-l-4 h-1/4 border-[#6e40c9]">
          <div>
            <Clock />
          </div>
        </td>
      </tr>
      <tr>
        <td className="border-t-4 border-l-4 border-[#6e40c9]"></td>
      </tr>
    </table>
  );
}

export default Infoskjerm;
