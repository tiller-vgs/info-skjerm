"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { start } from "repl";

interface EventComponentProps {
  title: string;
  body: string;
  starttime: Date;
  endtime?: Date;
}

export default function EventComponent({
  title,
  body,
  starttime,
  endtime,
}: EventComponentProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-xl">{body}</h2>
        <h2>
          {new Date(starttime).getHours()}:{new Date(starttime).getMinutes()}
          {(endtime == undefined)? (""): ("-" + new Date(endtime).getHours().toString() + ":" + new Date(endtime).getMinutes().toString())}
        </h2>
      </div>
    </>
  );
}
