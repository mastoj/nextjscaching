import Image from "next/image";
import { cache } from "react";

//export const runtime = "edge";
export const revalidate = 60;

const sampleData = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  ],
};

type Product = typeof sampleData;

const getProduct = async (productId: string) => {
  console.log("Fetching product", productId);
  const data = await fetch(
    `https://hub.dummyapis.com/delay?seconds=2&productId=${productId}`
  ).then((res) => res.text());
  return data;
};

const cachedGetProduct = cache(getProduct);

export async function generateStaticParams() {
  return [];
}

export default async function Home() {
  //  const data = await getProduct("1");
  // const data2 = await cachedGetProduct("2");
  // const data3 = await getProduct("1");
  // const data4 = await cachedGetProduct("2");
  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center justify-between p-24">
      Stuff
      {/* <Data {...data2} />
      <Data {...data3} />
      <Data {...data4} /> */}
    </main>
  );
}
function Data(data: {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}) {
  return (
    <div className="outline outline-red-500 outline-2 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <pre className="text-left">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
