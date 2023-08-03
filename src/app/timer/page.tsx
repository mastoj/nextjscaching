import { revalidatePath } from "next/cache";
import React from "react";

type Props = {};

//const dynamic = "force-dynamic";
export const revalidate = 10; // revalidate at most every hour

// export async function generateStaticParams() {
//   return [];
// }

const getTheTimeNoCache = async () => {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/Oslo",
    { next: { revalidate: 100 } }
  );
  console.log("Fetching time", response);
  return response.json();
};

const getTheTimeCached = async (time: number) => {
  return await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/Oslo?time" + time,
    {
      next: { revalidate: time },
    }
  ).then((res) => res.json());
};

const Response = (data: any) => (
  <div className="p-4">{JSON.stringify(data.data.datetime)}</div>
);
const Timer = async (props: Props) => {
  return (
    <div className="bg-teal-400">
      You got the cached time? No cache:{" "}
      <Response data={await getTheTimeNoCache()} />
      5 s: <Response data={await getTheTimeCached(5)} />
      15 s: <Response data={await getTheTimeCached(10)} />
      60 s: <Response data={await getTheTimeCached(60)} />
    </div>
  );
};

export default Timer;
