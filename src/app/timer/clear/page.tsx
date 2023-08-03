import { revalidatePath } from "next/cache";
import React from "react";

type Props = {};

const Timer = async (props: Props) => {
  const clearPageCache = async () => {
    "use server";
    revalidatePath("/timer");
  };
  return (
    <div className="bg-purple-600">
      You got the time?
      <form action={clearPageCache}>
        <input type="submit" value="Clear cache" />
      </form>
    </div>
  );
};

export default Timer;
