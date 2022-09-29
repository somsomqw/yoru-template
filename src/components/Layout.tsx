import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Category from "./Category";
import Footer from "./Footer";
import Header from "./Header";
import AdminLayout from "../components/admin/Layout";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/signup" || router.pathname === "/signin")
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  if (router.pathname.includes("admin"))
    return <AdminLayout>{children}</AdminLayout>;
  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 pl-52 pr-52 flex bg-gray-50">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
