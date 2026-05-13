import type { BusRouteType } from '@types'

function BusRoute({RouteData}: {RouteData: BusRouteType}) {
  return (
    <div>BusRoute {JSON.stringify(RouteData)}</div>
  )
}

export default BusRoute