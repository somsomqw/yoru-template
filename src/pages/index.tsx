import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Category from "../components/Category";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>e-commerce template</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Category />
        <h1 className="text-red-500">hello</h1>
      </div>
    </div>
  );
};

export default Home;
