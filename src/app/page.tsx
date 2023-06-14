import Image from "next/image";
import { cache } from "react";

export const runtime = "edge";
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
  // Wait 5 seconds before returning the product
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Fetching product", productId);
  const data = await fetch(`https://dummyjson.com/products/${productId}`).then(
    (res) => res.json() as Promise<Product>
  );
  return data;
};

const cachedGetProduct = cache(getProduct);

export async function generateStaticParams() {
  return [];
}

export default async function Home() {
  const data = await getProduct("1");
  const data2 = await cachedGetProduct("2");
  const data3 = await getProduct("1");
  const data4 = await cachedGetProduct("2");
  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center justify-between p-24">
      <div className="outline outline-red-500 outline-2 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <pre className="text-left">{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="outline outline-red-500 outline-2 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <pre className="text-left">{JSON.stringify(data2, null, 2)}</pre>
      </div>
      <div className="outline outline-red-500 outline-2 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <pre className="text-left">{JSON.stringify(data3, null, 2)}</pre>
      </div>
      <div className="outline outline-red-500 outline-2 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <pre className="text-left">{JSON.stringify(data4, null, 2)}</pre>
      </div>
    </main>
  );
}
