import Head from "next/head";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductCard from "../components/combination/ProductCard";
import { trpc } from "../utils/trpc";

const Home: React.FC = () => {
  const { data } = trpc.product.get.useQuery();
  return (
    <div>
      <Head>
        <title>e-commerce template</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Category />
        <div className="flex flex-wrap gap-4">
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              url={product.thumbnail}
              title={product.title}
              price={product.price}
              discount={product.discount}
              discountRate={product.discountRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
