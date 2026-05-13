import { BusFetch } from '../hooks/useBus';
import BusRoute from './BusRoute';

function BusRouteList({ BusStopName }: { BusStopName: string }) {
  const BusResonse = BusFetch(BusStopName);
  // if BusResonse is error
  const BusData = BusResonse.data!
  return (
    <>
      <div>
        <p>Northbound</p>
        {BusData.northBound.map((bus) => {return <BusRoute RouteData={bus} />})}
      </div>
      <div>
        <p>SouthBound</p>
        {BusData.southBound.map((bus) => {return <BusRoute RouteData={bus} />})}
      </div>
    </>
  )
}

export default BusRouteList