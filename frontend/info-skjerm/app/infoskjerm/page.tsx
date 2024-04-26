"use client";
import React from "react";
import Weather from "./Weather";
import DateTime from "./DateTime";
import Bus from "./Bus";

export default function InfoPage() {
  return (
    <main className=" p-3">
      <div className=" flex gap-3">
        <DateTime />
        <Weather />
        {/* <Bus /> */}
      </div>
      <div className="pt-3">
        <div className="border-2 border-white rounded-lg w-96 h-auto max-h-screen overflow-hidden">
          <h1 className="text-2xl p-3 bg-white bg-opacity-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu
            elit tempor, tempor nunc eget, ultricies dui. Phasellus ut finibus
            velit. Maecenas sit amet dolor tortor. Fusce eleifend, quam id
            condimentum porttitor, eros eros sagittis libero, vitae lobortis
            magna nisi sit amet ipsum. Curabitur cursus, diam et volutpat
            iaculis, nibh magna aliquet sem, sit amet aliquam tellus lacus eu
            metus. Nunc rutrum nulla vel mauris sodales, vitae sollicitudin
            turpis rhoncus. Nullam nec nunc nec nunc ultricies ultricies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu
            elit tempor, tempor nunc eget, ultricies dui. Phasellus ut finibus
            velit. Maecenas sit amet dolor tortor. Fusce eleifend, quam id
            condimentum porttitor, eros eros sagittis libero, vitae lobortis
            magna nisi sit amet ipsum. Curabitur cursus, diam et volutpat
            iaculis, nibh magna aliquet sem, sit amet aliquam tellus lacus eu
            metus. Nunc rutrum nulla vel mauris sodales, vitae sollicitudin
            turpis rhoncus. Nullam nec nunc nec nunc ultricies ultricies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu
            elit tempor, tempor nunc eget, ultricies dui. Phasellus ut finibus
            velit. Maecenas sit amet dolor tortor. Fusce eleifend, quam id
            condimentum porttitor, eros eros sagittis libero, vitae lobortis
            magna nisi sit amet ipsum. Curabitur cursus, diam et volutpat
            iaculis, nibh magna aliquet sem, sit amet aliquam tellus lacus eu
            metus. Nunc rutrum nulla vel mauris sodales, vitae sollicitudin
            turpis rhoncus. Nullam nec nunc nec nunc ultricies ultricies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu
            elit tempor, tempor nunc eget, ultricies dui. Phasellus ut finibus
            velit. Maecenas sit amet dolor tortor. Fusce eleifend, quam id
            condimentum porttitor, eros eros sagittis libero, vitae lobortis
            magna nisi sit amet ipsum. Curabitur cursus, diam et volutpat
            iaculis, nibh magna aliquet sem, sit amet aliquam tellus lacus eu
            metus. Nunc rutrum nulla vel mauris sodales, vitae sollicitudin
            turpis rhoncus. Nullam nec nunc nec nunc ultricies ultricies.
          </h1>
        </div>
      </div>
    </main>
  );
}
