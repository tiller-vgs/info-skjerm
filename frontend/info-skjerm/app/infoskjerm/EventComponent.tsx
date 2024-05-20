"use client";

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
      <div className="flex flex-col items-center justify-center p-4 max-w-96 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-xl">{body}</h2>
      </div>
    </>
  );
}
