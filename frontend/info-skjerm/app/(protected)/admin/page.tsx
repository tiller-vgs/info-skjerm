import React from "react";
import { CreateEvent } from "./createEvent";

export default function page() {
  return (
    <>
      <head>
        <title>Admin</title>
        <meta name="description" content="Profile" />
      </head>
      <main className="">
        <div className="flex items-center justify-center p-24 pt-14">
          <h1 className="mb-4 text-2xl">Opprett event</h1>
        </div>
        <div className=" flex items-center justify-center">
          <CreateEvent />
        </div>
      </main>
    </>
  );
}
