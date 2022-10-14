import {
  Badge,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import OrderDetailProgress from "../../../components/order/OrderDetailProgress";
import { getOrderProgressColor } from "../../../utils/caculate";
import { trpc } from "../../../utils/trpc";

type Props = {
  id: string;
};

const OrderDetail: React.FC<Props> = ({ id }) => {
  const { data } = trpc.order.getSingle.useQuery({ id });
  return (
    <div className="p-10">
      <Text className="font-bold text-3xl">注文詳細</Text>
      <div className="p-6">
        <Text className="font-bold text-2xl uppercase">注文番号</Text>
        <Text>{data?.id}</Text>
        <Spacer h={6} />
        <Text className="font-bold text-2xl uppercase">注文状況</Text>
        <OrderDetailProgress status={data?.status} />
        <RadioGroup>
          <Stack direction="row">
            <Radio>First</Radio>
            <Radio>First</Radio>
            <Radio>First</Radio>
          </Stack>
        </RadioGroup>
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
