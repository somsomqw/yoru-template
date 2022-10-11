import { Button, Spacer, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { trpc } from "../utils/trpc";

type Props = {
  cartId: string;
};

const Order: React.FC<Props> = ({ cartId }) => {
  const { data } = trpc.cart.get.useQuery({ cartId: Number(cartId) });
  const { mutate } = trpc.order.regist.useMutation();
  const onClick = () => {
    if (data?.products) {
      const totalPrice = data.products.reduce(
        (prev, curr) => prev + curr.price,
        0
      );
      mutate({
        cartId: Number(cartId),
        totalPrice,
      });
    }
  };
  return (
    <div className="p-10">
      <Text className="text-3xl font-bold">Order details</Text>
      <Spacer h={10} />
      <Button className="w-full" colorScheme="teal" onClick={onClick}>
        ORDER
      </Button>
    </div>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const cartId = session?.cartId;
  if (!cartId)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      cartId,
    },
  };
};
