import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductCard from "../components/combination/ProductCard";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.product.get.useQuery();
  return (
    <div>
      <Head>
        <title>e-commerce template</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <div className="flex">
        <Category />
        <div className="flex flex-wrap gap-4">
          {data?.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id as string}
              url="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
              title={product.title as string}
              price={product.price as number}
              discount={product.discount as boolean}
              discountRate={product.discountRate as number}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
