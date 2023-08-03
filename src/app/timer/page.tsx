import { revalidatePath } from "next/cache";
import React from "react";

type Props = {};

//const dynamic = "force-dynamic";
export const revalidate = 10; // revalidate at most every hour

const getTheTimeNoCache = async () => {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/Europe/Oslo",
    { cache: "no-cache" }
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
  const clearPageCache = async () => {
    "use server";
    revalidatePath("/timer");
  };
  return (
    <div className="bg-teal-400">
      <form action={clearPageCache}>
        <input type="submit" value="Clear cache" />
      </form>
      No cache: <Response data={await getTheTimeNoCache()} />
      5 s: <Response data={await getTheTimeCached(5)} />
      15 s: <Response data={await getTheTimeCached(10)} />
      60 s: <Response data={await getTheTimeCached(60)} />
    </div>
  );
};

export default Timer;
