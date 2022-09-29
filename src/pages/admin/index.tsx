import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  isAdmin: boolean;
};

const Admin: React.FC<Props> = ({ isAdmin }) => {
  return (
    <div>
      <div>ss</div>
    </div>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const isAdmin = session?.isAdmin;
  if (!isAdmin)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      isAdmin: isAdmin,
    },
  };
};
