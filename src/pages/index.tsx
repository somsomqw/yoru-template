import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>e-commerce template</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-red-500">hello</h1>
    </div>
  );
};

export default Home;
