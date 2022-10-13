import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { trpc } from "../../../utils/trpc";

type Props = {
  id: string;
};

const OrderDetail: React.FC<Props> = ({ id }) => {
  const { data } = trpc.order.getSingle.useQuery({ id });
  return (
    <div className="p-10">
      <Text className="font-bold text-3xl">Order detail</Text>
      <div className="p-6">
        <Text className="font-bold uppercase">order number</Text>
        <Text>{data?.id}</Text>
      </div>
    </div>
  );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
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
      id,
    },
  };
};
