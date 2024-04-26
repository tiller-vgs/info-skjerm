import Image from "next/image";
import React from "react";
import sun from "../../public/WeatherSymbols/darkmode/png/200/01d.png";

export default function Weather() {
  return (
    <div className="border-2 border-white rounded-lg w-screen h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-7 w-full">
          <div className="flex flex-col items-center justify-center">
            <h1>Mandag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Tirsdag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Onsdag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Torsdag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Fredag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Lørdag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1>Søndag</h1>
            <Image src={sun} width={50} height={50} alt="sun" />
            <h2 className="text-xl font-bold">10°C</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
